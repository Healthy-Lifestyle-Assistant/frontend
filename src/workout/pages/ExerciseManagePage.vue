<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div>
            <BreadcrumbWorkoutsComponent />
            <AlertComponent :message="message" :messageType="messageType" /><br>
        </div>

        <!-- Update Exercise -->
        <h4 v-if="!isDeleted" class="mb-4 text-muted">Update Exercise</h4>

        <form v-if="!isDeleted" class="mb-5 form-width" @submit.prevent="onSubmitUpdateForm">
            <div class="mb-4">
                <label for="title" class="form-label">Current title: {{ this.titleLabel }}</label>
                <input type="text" class="form-control" id="title" v-model="title" placeholder="Enter new title">
            </div>

            <div class="mb-4">
                <label for="description" class="form-label">Current descirption: {{ this.descriptionLabel ?
                    this.descriptionLabel : "None"
                }}</label>
                <textarea rows="3" class="form-control" id="description" v-model="description"
                    placeholder="Enter new description"></textarea>
            </div>

            <div class="form-check mb-4">
                <input type="checkbox" value="" class="form-check-input" id="needsEquipment" v-model="needsEquipment"
                    @change="onNeedsEquipmentCheckboxChange">
                <label for="needsEquipment" class="form-check-label">Needs Equipment</label>
            </div>

            <div class="mb-2">Body parts</div>
            <div v-if="exerciseBodyParts && exerciseBodyParts.length > 0" class="d-flex flex-row flex-wrap mb-4">
                <div v-for="bodyPart in exerciseBodyParts" :key="bodyPart.id" class="me-2">
                    <input type="checkbox" value="" class="form-check-input" :id="bodyPart.name"
                        @click="onClickBodyPartCheckbox(bodyPart.id)" :checked="bodyPartsStates[bodyPart.id]">
                    <label :for="bodyPart.name" class="form-check-label">{{ bodyPart.name }}</label>
                </div>
            </div>

            <div class="mb-2">Media references</div>
            <div v-if="exerciseHttpRefs && exerciseHttpRefs.length > 0" class="d-flex flex-row flex-wrap mb-4">
                <div v-for="httpRef in exerciseHttpRefs" :key="httpRef.id" class="me-2 mb-2">
                    <input type="checkbox" value="" class="form-check-input" :id="httpRef.name"
                        @click="onClickHttpRefCheckbox(httpRef.id)" :checked="httpRefsStates[httpRef.id]">
                    <label :for="httpRef.name" class="form-check-label">{{ httpRef.name }}</label>
                </div>
            </div>

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
import { getToken } from "../../shared/js/auth.js";
import { getAndValidateToken } from "../../shared/js/auth.js";
import { EXERCISES_SLASH, BODY_PARTS, HTTP_REFS, PAGE_SIZE } from "../../shared/URL.js";
import { SUCCESS, WARNING, EXERCISE_UPDATED_SUCCESSFULLY, EXERCISE_DELETED_SUCCESSFULLY } from "../../shared/MESSAGE.js";
import AlertComponent from "../../shared/components/AlertComponent.vue";
import BreadcrumbWorkoutsComponent from "../components/BreadcrumbWorkoutsComponent.vue";

export default {
    name: "ExerciseManagePage",

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
            titleLabel: "",
            descriptionLabel: "",

            title: null,
            description: null,
            needsEquipment: null,
            exerciseBodyParts: [],
            exerciseHttpRefs: [],
            allBodyParts: [],
            allHttpRefs: [],

            needsEquipmentChanged: false,
            bodyPartIds: [],
            httpRefIds: [],

            bodyPartsStates: {},
            httpRefsStates: {},

            message: "",
            messageType: "",
            isDeleted: false,
            confirmDeletion: false
        };
    },

    components: {
        AlertComponent,
        BreadcrumbWorkoutsComponent
    },

    async created() {
        this.$store.commit("setCurrentUrl", `/workouts-manage-exercise/${this.$route.params.id}`);
        const token = await getAndValidateToken();
        if (!token) {
            this.$store.commit("setLogged", false);
            this.$router.push("/login");
        } else {
            this.$store.commit("setLogged", true);
            await this.getExerciseDetails(this.$route.params.id);

            let responseBodyParts = await this.getBodyParts();
            this.allBodyParts = responseBodyParts.body;

            let responseHttpRefs = await this.getHttpRefs();
            this.allHttpRefs = responseHttpRefs.body.content;

            this.exerciseBodyParts = this.exerciseBodyParts.concat(
                this.allBodyParts.filter(item => !this.exerciseBodyParts.some(elt => elt.id === item.id))
            );
            this.exerciseHttpRefs = this.exerciseHttpRefs.concat(
                this.allHttpRefs.filter(item => !this.exerciseHttpRefs.some(elt => elt.id === item.id))
            );
        }
    },

    methods: {
        async onSubmitUpdateForm() {
            const requestDto = {
                title: this.title,
                description: this.description,
                needsEquipment: this.needsEquipmentChanged ? this.needsEquipment : null,
                bodyPartIds: this.bodyPartIds,
                httpRefIds: this.httpRefIds
            };

            if (this.bodyPartIds === null || this.bodyPartIds.length === 0) {
                alert("Exercise should be associated with at least one body part.")
            } else {
                const res = await this.updateExercise(requestDto);

                if (res.status === 200) {
                    this.messageType = SUCCESS;
                    this.message = EXERCISE_UPDATED_SUCCESSFULLY;

                    this.titleLabel = res.body.title;
                    this.descriptionLabel = res.body.description;
                    this.title = null;
                    this.description = null;
                    this.needsEquipment = res.body.needsEquipment;
                    this.needsEquipmentChanged = false;
                    this.exerciseBodyParts = res.body.bodyParts;
                    this.exerciseHttpRefs = res.body.httpRefs;

                    this.bodyPartIds = this.exerciseBodyParts.map(bodyPart => bodyPart.id);
                    this.httpRefIds = this.exerciseHttpRefs.map(httpRef => httpRef.id);

                    this.exerciseBodyParts = this.exerciseBodyParts.concat(
                        this.allBodyParts.filter(item => !this.exerciseBodyParts.some(elt => elt.id === item.id))
                    );
                    this.exerciseHttpRefs = this.exerciseHttpRefs.concat(
                        this.allHttpRefs.filter(item => !this.exerciseHttpRefs.some(elt => elt.id === item.id))
                    );
                } else {
                    let messageBuilder = "";
                    for (const key in res.body) {
                        messageBuilder += `${key}: ${res.body[key]}. `;
                    }
                    this.messageType = WARNING;
                    this.message = messageBuilder;
                }
            }
        },

        async onSubmitDeleteForm() {
            try {
                const res = await this.deleteExercise(this.$route.params.id);

                if (res.status === 204) {
                    this.messageType = SUCCESS;
                    this.message = EXERCISE_DELETED_SUCCESSFULLY;
                    this.isDeleted = true;
                } else {
                    this.messageType = WARNING;
                    this.message = "Error occured";
                }
            } catch (error) {
                this.messageType = WARNING;
                this.message = `Error: ${error}`;
            }
        },

        onNeedsEquipmentCheckboxChange() {
            this.needsEquipmentChanged = !this.needsEquipmentChanged;
        },

        onClickBodyPartCheckbox(id) {
            if (this.bodyPartIds.includes(id)) {
                let index = this.bodyPartIds.indexOf(id);
                this.bodyPartIds.splice(index, 1);
                delete this.bodyPartsStates[id];
            } else {
                this.bodyPartIds.push(id);
                this.bodyPartsStates[id] = true;
            }
        },

        onClickHttpRefCheckbox(id) {
            if (this.httpRefIds.includes(id)) {
                let index = this.httpRefIds.indexOf(id);
                this.httpRefIds.splice(index, 1);
                delete this.httpRefsStates[id];
            } else {
                this.httpRefIds.push(id);
                this.httpRefsStates[id] = true;
            }
        },

        async getExerciseDetails(id) {
            let URL = EXERCISES_SLASH + id;
            let token = getToken();
            const res = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            this.titleLabel = data.title;
            this.descriptionLabel = data.description;
            this.needsEquipment = data.needsEquipment;
            this.exerciseBodyParts = data.bodyParts;
            this.exerciseHttpRefs = data.httpRefs;
            this.bodyPartIds = this.exerciseBodyParts.map(bodyPart => bodyPart.id);
            this.httpRefIds = this.exerciseHttpRefs.map(httpRef => httpRef.id);

            this.bodyPartIds.forEach(id => {
                this.bodyPartsStates[id] = true;
            });
            this.httpRefIds.forEach(id => {
                this.httpRefsStates[id] = true;
            });
        },

        async getBodyParts() {
            const res = await fetch(BODY_PARTS, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            return {
                status: res.status,
                body: data
            };
        },

        async getHttpRefs() {
            let URL = HTTP_REFS + PAGE_SIZE;
            let token = getToken();
            const res = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            return {
                status: res.status,
                body: data
            };
        },

        async updateExercise(requestBody) {
            let URL = EXERCISES_SLASH + this.$route.params.id;
            let token = getToken();
            const res = await fetch(URL, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });
            const data = await res.json();
            return {
                status: res.status,
                body: data
            };
        },

        async deleteExercise(id) {
            let URL = EXERCISES_SLASH + id;
            let token = getToken();
            const res = await fetch(URL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return {
                status: res.status
            };
        }
    }
};
</script>
