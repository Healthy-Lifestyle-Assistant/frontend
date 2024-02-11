<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div>
            <BreadcrumbWorkoutsComponent />
            <AlertListComponent :alerts="alerts" />
            <AlertComponent :message="message" :messageType="messageType" />
        </div>

        <!-- Update Exercise -->
        <h4 v-if="!isDeleted" class="mb-4 text-muted">Update Exercise</h4>

        <form v-if="!isDeleted" class="mb-5 form-width" @submit.prevent="onSubmitUpdateForm">
            <div class="mb-4">
                <label for="title" class="form-label">Current title: {{ exercise.title }}</label>
                <div class="d-flex align-items-center mb-2 me-3">
                    <input type="text" class="form-control me-1" id="title" v-model="formTitle" placeholder="Enter new title">
                    <TooltipComponent :text="getTooltipText('title')" />
                </div>
            </div>

            <div class="mb-4">
                <label for="description" class="form-label">Current descirption:
                    {{ exercise.description ? exercise.description : "None" }}
                </label>
                <div class="d-flex align-items-center mb-2 me-3">
                    <textarea rows="3" class="form-control me-1" id="description" v-model="formDescription"
                        placeholder="Enter new description"></textarea>
                    <TooltipComponent :text="getTooltipText('description')" />
                </div>
            </div>

            <div class="form-check mb-4">
                <input type="checkbox" value="" class="form-check-input" id="needsEquipment" v-model="formNeedsEquipment"
                    @change="onNeedsEquipmentCheckboxChange">
                <label for="needsEquipment" class="form-check-label">Needs Equipment</label>
            </div>

            <div class="mb-2">Body parts</div>
            <div v-if="allBodyParts && allBodyParts.length > 0" class="d-flex flex-row flex-wrap mb-4 elements-border">
                <div v-for="bodyPart in allBodyParts" :key="bodyPart.id" class="me-2">
                    <input type="checkbox" value="" class="form-check-input me-1 elements-border" 
                        :id="bodyPart.name"
                        @click="onClickBodyPartCheckbox(bodyPart.id)"
                        :checked="formSelectedBodyPartsCheckboxesStates[bodyPart.id]">
                    <label :for="bodyPart.name" class="form-check-label body-part-checkbox-width">{{ bodyPart.name }}</label>
                </div>
            </div>

            <div class="mb-2">Media references</div>
            <div v-if="allHttpRefs && allHttpRefs.length > 0" class="d-flex flex-row flex-wrap mb-4 checkboxes-scroll elements-border">
                <div v-for="httpRef in allHttpRefs" :key="httpRef.id" class="me-2 mb-2">
                    <input type="checkbox" value="" class="form-check-input me-1" :id="httpRef.name"
                        @click="onClickHttpRefCheckbox(httpRef.id)"
                        :checked="formSelectedHttpRefsCheckboxesStates[httpRef.id]">
                    <label :for="httpRef.name" class="form-check-label http-ref-checkbox-width">
                        {{ getTruncatedString(httpRef.name, 40) }}
                    </label>
                </div>
            </div>

            <button @click.prevent="onClearForm" class="btn btn-outline-secondary mt-2 me-2">Clear</button>
            <button type="submit" class="btn btn-secondary mt-2">Update</button>
        </form>

        <!-- Delete Exercise -->
        <div v-if="!isDeleted" class="form-width">
            <h4 class="mb-2 text-muted">Delete Exercise</h4>
            <div class="mb-2">Deletion of the exercise will not affect associated workouts and media references.</div>
            <div class="d-flex">
                <input type="checkbox" value="" class="form-check-input" id="confirmDeletion" v-model="confirmDeletion">
                <label for="confirmDeletion" class="form-check-label ms-2"><span class="span-color">Confirm deletion. This
                        action cannot be undone.</span></label>
            </div>

            <form @submit.prevent="onSubmitDeleteForm" style="min-width: 13rem; width: fit-content;" class="mb-5">
                <button :disabled="!confirmDeletion" type="submit" class="btn btn-warning mt-4">Delete</button>
            </form>
            <br>
        </div>

    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { getAndValidateToken, getToken, on401, redirectToLoginSessionExpired } from "@/shared/js/auth";
import { getStringOrNull, truncateStringWithWordBoundary } from "@/shared/js/stringUtils";
import { buildAlertsList } from "@/shared/js/exceptions";
import { BODY_PARTS, EXERCISES_SLASH, HTTP_REFS, PAGE_SIZE } from "@/shared/URL";
import {
    EXERCISE_DELETED_SUCCESSFULLY, EXERCISE_SHOULD_HAVE_BODY_PARTS, EXERCISE_UPDATED_SUCCESSFULLY,
    SUCCESS, WARNING
} from "@/shared/Messages";
import { DESCRIPTION_TOOLTIP, TITLE_TOOLTIP } from "@/shared/Tooltips";
import AlertComponent from "@/shared/components/AlertComponent.vue";
import AlertListComponent from "@/shared/components/AlertListComponent.vue";
import BreadcrumbWorkoutsComponent from "../components/BreadcrumbWorkoutsComponent.vue";
import TooltipComponent from "@/shared/components/TooltipComponent.vue";

export default {
    name: "ExerciseManagePage",

    components: {
        AlertComponent,
        AlertListComponent,
        BreadcrumbWorkoutsComponent,
        TooltipComponent
    },

    setup() {
        useMeta({
            title: "Manage Exercise",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            formTitle: null,
            formDescription: null,
            formNeedsEquipment: null,
            formSelectedBodyPartIds: [],
            formSelectedHttpRefIds: [],
            formSelectedBodyPartsCheckboxesStates: {},
            formSelectedHttpRefsCheckboxesStates: {},
            formNeedsEquipmentChanged: false,

            exercise: {},
            allBodyParts: [],
            allHttpRefs: [],

            message: null,
            messageType: null,
            alerts: [],

            isDeleted: false,
            confirmDeletion: false
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", `/workouts-manage-exercise/${this.$route.params.id}`);
        const token = await getAndValidateToken(this);

        if (!token) {
            redirectToLoginSessionExpired(this);
        } else {
            this.$store.commit("setLogged", true);
            let responseExercise = await this.getExerciseDetails(this.$route.params.id);
            let responseBodyParts = await this.getDefaultBodyParts();
            let responseHttpRefs = await this.getDefaultAndCustomHttpRefs();

            if (responseExercise.status === 200 && responseBodyParts.status === 200 && responseHttpRefs.status === 200) {
                this.exercise = responseExercise.body;
                this.formNeedsEquipment = this.exercise.needsEquipment;
                this.allBodyParts = responseBodyParts.body;
                this.allHttpRefs = responseHttpRefs.body.content;
                this.formSelectedBodyPartIds = this.exercise.bodyParts.map(bodyPart => bodyPart.id);
                this.formSelectedHttpRefIds = this.exercise.httpRefs.map(httpRef => httpRef.id);
                this.formSelectedBodyPartIds.forEach(id => {
                    this.formSelectedBodyPartsCheckboxesStates[id] = true;
                });
                this.formSelectedHttpRefIds.forEach(id => {
                    this.formSelectedHttpRefsCheckboxesStates[id] = true;
                });
            } else if (responseExercise.status === 401 || responseHttpRefs.status === 401) {
                on401(this);
            } else {
                if (responseExercise.status !== 200) {
                    this.alerts = this.alerts.concat(buildAlertsList(responseExercise.body, WARNING));
                }
                if (responseHttpRefs.status !== 200) {
                    this.alerts = this.alerts.concat(buildAlertsList(responseHttpRefs.body, WARNING));
                }
            }
        }
    },

    methods: {
        async onSubmitUpdateForm() {
            const requestDto = {
                title: getStringOrNull(this.formTitle),
                description: getStringOrNull(this.formDescription),
                needsEquipment: this.formNeedsEquipmentChanged ? this.formNeedsEquipment : null,
                bodyPartIds: this.formSelectedBodyPartIds,
                httpRefIds: this.formSelectedHttpRefIds
            };

            if (this.formSelectedBodyPartIds === null || this.formSelectedBodyPartIds.length === 0) {
                alert(EXERCISE_SHOULD_HAVE_BODY_PARTS);
            } else {
                const response = await this.updateExercise(requestDto);
                if (response.status === 200) {
                    this.exercise = response.body;
                    this.onClearForm();
                    this.messageType = SUCCESS;
                    this.message = EXERCISE_UPDATED_SUCCESSFULLY;
                } else if (response.status === 401) {
                    on401(this);
                } else {
                    this.message = null;
                    this.messageType = null;
                    this.alerts = buildAlertsList(response.body, WARNING);
                }
            }
        },

        async onSubmitDeleteForm() {
            const response = await this.deleteExercise(this.$route.params.id);
            if (response.status === 204) {
                this.messageType = SUCCESS;
                this.message = EXERCISE_DELETED_SUCCESSFULLY;
                this.isDeleted = true;
            } else if (response.status === 401) {
                on401(this);
            } else {
                this.alerts = buildAlertsList(response.body, WARNING);
            }
        },

        onClearForm() {
            this.formTitle = null;
            this.formDescription = null;
            this.formNeedsEquipment = this.exercise.needsEquipment;
            this.formNeedsEquipmentChanged = false;
            this.formSelectedBodyPartIds = this.exercise.bodyParts.map(bodyPart => bodyPart.id);
            this.formSelectedHttpRefIds = this.exercise.httpRefs.map(httpRef => httpRef.id);
            this.formSelectedBodyPartsCheckboxesStates = {};
            this.formSelectedBodyPartIds.forEach(id => {
                this.formSelectedBodyPartsCheckboxesStates[id] = true;
            });
            this.formSelectedHttpRefsCheckboxesStates = {};
            this.formSelectedHttpRefIds.forEach(id => {
                this.formSelectedHttpRefsCheckboxesStates[id] = true;
            });
            this.message = null;
            this.messageType = null;
            this.alerts = [];
        },

        onNeedsEquipmentCheckboxChange() {
            console.log(this.formNeedsEquipmentChanged);
            this.formNeedsEquipmentChanged = !this.formNeedsEquipmentChanged;
        },

        onClickBodyPartCheckbox(id) {
            if (this.formSelectedBodyPartIds.includes(id)) {
                let index = this.formSelectedBodyPartIds.indexOf(id);
                this.formSelectedBodyPartIds.splice(index, 1);
                delete this.formSelectedBodyPartsCheckboxesStates[id];
            } else {
                this.formSelectedBodyPartIds.push(id);
                this.formSelectedBodyPartsCheckboxesStates[id] = true;
            }
        },

        onClickHttpRefCheckbox(id) {
            if (this.formSelectedHttpRefIds.includes(id)) {
                let index = this.formSelectedHttpRefIds.indexOf(id);
                this.formSelectedHttpRefIds.splice(index, 1);
                delete this.formSelectedHttpRefsCheckboxesStates[id];
            } else {
                this.formSelectedHttpRefIds.push(id);
                this.formSelectedHttpRefsCheckboxesStates[id] = true;
            }
        },

        getTooltipText(fieldName) {
            if (fieldName === "title") {
                return TITLE_TOOLTIP;
            }
            if (fieldName === "description") {
                return DESCRIPTION_TOOLTIP;
            }
        },

        getTruncatedString(string, maxLength) {
            return truncateStringWithWordBoundary(string, maxLength);
        },

        async getExerciseDetails(id) {
            let URL = EXERCISES_SLASH + id;
            let token = getToken();
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            return {
                status: response.status,
                body: data
            };
        },

        async getDefaultBodyParts() {
            const response = await fetch(BODY_PARTS, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            return {
                status: response.status,
                body: data
            };
        },

        async getDefaultAndCustomHttpRefs() {
            let URL = HTTP_REFS + PAGE_SIZE;
            let token = getToken();
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            return {
                status: response.status,
                body: data
            };
        },

        async updateExercise(requestBody) {
            let URL = EXERCISES_SLASH + this.$route.params.id;
            let token = getToken();
            const response = await fetch(URL, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();
            return {
                status: response.status,
                body: data
            };
        },

        async deleteExercise(id) {
            let URL = EXERCISES_SLASH + id;
            let token = getToken();
            const response = await fetch(URL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return {
                status: response.status
            };
        }
    }
};
</script>
