<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div>
            <BreadcrumbWorkoutsComponent/>
            <AlertListComponent :alerts="alerts"/>
            <AlertComponent :message="message" :messageType="messageType"/>
        </div>

        <h4 class="mb-4 text-muted">Create Exercise</h4>

        <form class="mb-5 form-width" @submit.prevent="onSubmitForm">
            <div class="mb-4">
                <label class="form-label" for="title">Title<span class="span-color"> *</span></label>
                <div class="d-flex align-items-center mb-2 me-3">
                    <input id="title" v-model="formTitle" class="form-control me-1" placeholder="Enter title" required
                           type="text">
                    <TooltipComponent :text="getTooltipText('title')"/>
                </div>
            </div>

            <div class="mb-4">
                <label class="form-label" for="description">Description</label>
                <div class="d-flex align-items-center mb-2 me-3">
                    <textarea id="description" v-model="formDescription" class="form-control me-1"
                              placeholder="Enter description (optional)" rows="3">
                    </textarea>
                    <TooltipComponent :text="getTooltipText('description')"/>
                </div>
            </div>

            <div class="form-check mb-4">
                <input id="needsEquipment" v-model="formNeedsEquipment" class="form-check-input" type="checkbox"
                       value="">
                <label class="form-check-label" for="needsEquipment">Needs Equipment</label>
            </div>

            <div class="mb-2">Body parts<span class="span-color"> *</span></div>
            <div v-if="allBodyParts && allBodyParts.length > 0" class="d-flex flex-row flex-wrap mb-4 elements-border">
                <div v-for="bodyPart in allBodyParts" :key="bodyPart.id" class="me-2">
                    <input :id="bodyPart.name" :checked="formBodyPartsSelectedCheckboxesStates[bodyPart.id]"
                           class="form-check-input me-1" type="checkbox" value=""
                           @click="onClickBodyPartCheckbox(bodyPart.id)">
                    <label :for="bodyPart.name" class="form-check-label body-part-checkbox-width">
                        {{ bodyPart.name }}</label>
                </div>
            </div>

            <div class="mb-2">Media references (optional)</div>
            <div v-if="allHttpRefs && allHttpRefs.length > 0"
                 class="d-flex flex-row flex-wrap mb-4 checkboxes-scroll elements-border">
                <div v-for="httpRef in allHttpRefs" :key="httpRef.id" class="me-4 mb-2">
                    <input :id="httpRef.name" :checked="formHttpRefsSelectedCheckboxesStates[httpRef.id]"
                           class="form-check-input me-1" type="checkbox" value=""
                           @click="onClickHttpRefCheckbox(httpRef.id)">
                    <label :for="httpRef.name" class="form-check-label http-ref-checkbox-width">
                        {{ getTruncatedString(httpRef.name, 40) }}</label>
                </div>
            </div>

            <div>
                <span class="span-color">* </span><i>Required fields</i>
            </div>

            <button class="btn btn-outline-secondary mt-4 me-2" @click.prevent="onClearForm">Clear</button>
            <button class="btn btn-secondary mt-4" type="submit">Create</button>
            <br><br>
        </form>
    </div>
</template>

<script>
import {useMeta} from "vue-meta";
import {StringUtil} from "@/shared/util/StringUtil";
import {AuthUtil} from "@/auth/misc/AuthUtil";
import {ExceptionUtil} from "@/shared/util/ExceptionUtil";
import {AlertMessageWorkout} from "@/activity/workout/misc/AlertMessageWorkout";
import {AlertMessageShared} from "@/shared/util/AlertMessageShared";
import {UrlWorkout} from "@/activity/workout/misc/UrlWorkout";
import {TooltipShared} from "@/shared/util/TooltipShared";
import {UrlShared} from "@/shared/util/UrlShared";
import AlertComponent from "@/shared/components/AlertComponent.vue";
import AlertListComponent from "@/shared/components/AlertListComponent.vue";
import BreadcrumbWorkoutsComponent from "./components/BreadcrumbWorkoutsComponent.vue";
import TooltipComponent from "@/shared/components/TooltipComponent.vue";

export default {
    name: "ExerciseCreatePage",

    components: {
        AlertComponent,
        AlertListComponent,
        BreadcrumbWorkoutsComponent,
        TooltipComponent
    },

    setup() {
        useMeta({
            title: "Create Exercise",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            formTitle: null,
            formDescription: null,
            formNeedsEquipment: false,
            formSelectedBodyPartIds: [],
            formSelectedHttpRefIds: [],
            formBodyPartsSelectedCheckboxesStates: {},
            formHttpRefsSelectedCheckboxesStates: {},

            allBodyParts: [],
            allHttpRefs: [],

            message: null,
            messageType: null,
            alerts: []
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-create-exercise");
        const token = await AuthUtil.getAndValidateToken(this);

        if (!token) {
            AuthUtil.redirectToLoginCreateNewEntity(this);
        } else {
            this.$store.commit("setLogged", true);
            let bodyPartsResponse = await this.getDefaultBodyParts();
            let httpRefsResponse = await this.getDefaultAndCustomHttpRefs();

            if (bodyPartsResponse.status === 200 && httpRefsResponse.status === 200) {
                this.allBodyParts = bodyPartsResponse.body;
                this.allHttpRefs = httpRefsResponse.body["content"];
            } else if (httpRefsResponse.status === 401) {
                AuthUtil.on401(this);
            } else {
                if (bodyPartsResponse.status !== 200) {
                    this.alerts = this.alerts.concat(ExceptionUtil.buildAlertsList(bodyPartsResponse.body, AlertMessageShared.WARNING));
                }
                if (httpRefsResponse.status !== 200) {
                    this.alerts = this.alerts.concat(ExceptionUtil.buildAlertsList(httpRefsResponse.body, AlertMessageShared.WARNING));
                }
            }
        }
    },

    methods: {
        async onSubmitForm() {
            if (this.formSelectedBodyPartIds === null || this.formSelectedBodyPartIds.length === 0) {
                alert(AlertMessageWorkout.EXERCISE_SHOULD_HAVE_BODY_PARTS);
            } else {
                const requestDto = {
                    title: StringUtil.getStringOrNull(this.formTitle),
                    description: StringUtil.getStringOrNull(this.formDescription),
                    needsEquipment: this.formNeedsEquipment,
                    bodyParts: this.formSelectedBodyPartIds,
                    httpRefs: this.formSelectedHttpRefIds
                };

                const response = await this.createExercise(requestDto);
                if (response.status === 201) {
                    this.onClearForm();
                    this.messageType = AlertMessageShared.SUCCESS;
                    this.message = AlertMessageShared.CREATED_SUCCESSFULLY;
                } else if (response.status === 401) {
                    AuthUtil.on401(this);
                } else {
                    this.message = null;
                    this.messageType = null;
                    this.alerts = ExceptionUtil.buildAlertsList(response.body, AlertMessageShared.WARNING);
                }
            }
        },

        onClearForm() {
            this.formTitle = null;
            this.formDescription = null;
            this.formNeedsEquipment = false;
            this.formSelectedBodyPartIds = [];
            this.formSelectedHttpRefIds = [];
            this.formBodyPartsSelectedCheckboxesStates = {};
            this.formHttpRefsSelectedCheckboxesStates = {};
            this.message = null;
            this.messageType = null;
            this.alerts = [];
        },

        onClickBodyPartCheckbox(id) {
            if (this.formSelectedBodyPartIds.includes(id)) {
                let index = this.formSelectedBodyPartIds.indexOf(id);
                this.formSelectedBodyPartIds.splice(index, 1);
                delete this.formBodyPartsSelectedCheckboxesStates[id];
            } else {
                this.formSelectedBodyPartIds.push(id);
                this.formBodyPartsSelectedCheckboxesStates[id] = true;
            }
        },

        onClickHttpRefCheckbox(id) {
            if (this.formSelectedHttpRefIds.includes(id)) {
                let index = this.formSelectedHttpRefIds.indexOf(id);
                this.formSelectedHttpRefIds.splice(index, 1);
                delete this.formHttpRefsSelectedCheckboxesStates[id];
            } else {
                this.formSelectedHttpRefIds.push(id);
                this.formHttpRefsSelectedCheckboxesStates[id] = true;
            }
        },

        getTooltipText(fieldName) {
            if (fieldName === "title") {
                return TooltipShared.TITLE_TOOLTIP;
            }
            if (fieldName === "description") {
                return TooltipShared.DESCRIPTION_TOOLTIP;
            }
        },

        getTruncatedString(string, maxLength) {
            return StringUtil.truncateStringWithWordBoundary(string, maxLength);
        },

        async createExercise(requestBody) {
            let token = AuthUtil.getToken();
            const response = await fetch(UrlWorkout.EXERCISES, {
                method: "POST",
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

        async getDefaultBodyParts() {
            const response = await fetch(UrlWorkout.BODY_PARTS, {
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
            let token = AuthUtil.getToken();
            const response = await fetch(UrlWorkout.HTTP_REFS + UrlShared.PAGE_SIZE, {
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
        }
    }
};
</script>
