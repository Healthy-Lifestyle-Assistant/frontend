<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div>
            <BreadcrumbWorkoutsComponent />
            <AlertComponent :message="message" :messageType="messageType" /><br>
        </div>

        <h4 class="mb-4 text-muted">Create Exercise</h4>

        <form @submit.prevent="onSubmitForm" class="mb-5 form-width">
            <div class="mb-4">
                <label for="title" class="form-label">Title<span class="span-color"> *</span></label>
                <input type="text" class="form-control" id="title" v-model="title" placeholder="Enter title" required>
            </div>

            <div class="mb-4">
                <label for="description" class="form-label">Description</label>
                <textarea rows="3" class="form-control" id="description" v-model="description"
                    placeholder="Enter description (optional)">
                </textarea>
            </div>

            <div class="form-check mb-4">
                <input type="checkbox" value="" class="form-check-input" id="needsEquipment" v-model="needsEquipment">
                <label for="needsEquipment" class="form-check-label">Needs Equipment</label>
            </div>

            <div class="mb-2">Body parts<span class="span-color"> *</span></div>
            <div v-if="bodyParts && bodyParts.length > 0" class="d-flex flex-row flex-wrap mb-4">
                <div v-for="bodyPart in bodyParts" :key="bodyPart.id" class="me-2">
                    <input type="checkbox" value="" class="form-check-input" :id="bodyPart.name"
                        @click="onClickBodyPartCheckbox(bodyPart.id)" :checked="bodyPartsStates[bodyPart.id]">
                    <label :for="bodyPart.name" class="form-check-label">{{ bodyPart.name }}</label>
                </div>
            </div>

            <div class="mb-2">Media references (optional)</div>
            <div v-if="httpRefs && httpRefs.length > 0" class="d-flex flex-row flex-wrap mb-4">
                <div v-for="httpRef in httpRefs" :key="httpRef.id" class="me-4 mb-2">
                    <input type="checkbox" value="" class="form-check-input" :id="httpRef.name"
                        @click="onClickHttpRefCheckbox(httpRef.id)" :checked="httpRefsStates[httpRef.id]">
                    <label :for="httpRef.name" class="form-check-label">{{ httpRef.name }}</label>
                </div>
            </div>

            <div>
                <span class="span-color">* </span><i>Required fields</i>
            </div>

            <button type="submit" class="btn btn-secondary mt-4">Create</button>
            <br><br>
        </form>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { getToken } from "../../shared/js/auth.js";
import { getAndValidateToken } from "../../shared/js/auth.js";
import { SUCCESS, WARNING, EXERCISE_CREATED_SUCCESSFULLY } from "../../shared/MESSAGE.js";
import { EXERCISES, BODY_PARTS, HTTP_REFS, PAGE_SIZE } from "../../shared/URL.js";
import AlertComponent from "../../shared/components/AlertComponent.vue";
import BreadcrumbWorkoutsComponent from "../components/BreadcrumbWorkoutsComponent.vue";

export default {
    name: "ExerciseCreatePage",

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
            title: "",
            description: "",
            bodyPartIds: [],
            httpRefIds: [],
            needsEquipment: false,
            message: "",
            messageType: "",
            bodyParts: [],
            bodyPartsStates: {},
            httpRefs: [],
            httpRefsStates: {}
        };
    },

    components: {
        AlertComponent,
        BreadcrumbWorkoutsComponent
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-create-exercise");
        const token = await getAndValidateToken();
        if (!token) {
            this.$store.commit("setLogged", false);
            this.$router.push("/login");
        } else {
            this.$store.commit("setLogged", true);

            let bodyPartsResponse = await this.getBodyParts();
            this.bodyParts = bodyPartsResponse.body;

            let httpRefsResponse = await this.getHttpRefs();
            this.httpRefs = httpRefsResponse.body.content;
        }
    },

    methods: {
        async onSubmitForm() {
            const requestDto = {
                title: this.title,
                description: this.description,
                needsEquipment: this.needsEquipment,
                bodyParts: this.bodyPartIds,
                httpRefs: this.httpRefIds
            };

            if (this.bodyPartIds === null || this.bodyPartIds.length === 0) {
                alert("Exercise should be associated with at least one body part.")
            } else {
                const res = await this.createExercise(requestDto);
                if (res.status === 201) {
                    this.messageType = SUCCESS;
                    this.message = EXERCISE_CREATED_SUCCESSFULLY;
                } else {
                    let messageBuilder = "";
                    for (const key in res.body) {
                        messageBuilder += `${key}: ${res.body[key]}. `;
                    }
                    this.messageType = WARNING;
                    this.message = messageBuilder;
                }

                this.title = "";
                this.description = "";
                this.bodyPartIds = [];
                this.httpRefIds = [];
                this.needsEquipment = false;
                this.bodyPartsStates = {};
                this.httpRefsStates = {};
            }
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

        async createExercise(requestBody) {
            let token = getToken();
            const res = await fetch(EXERCISES, {
                method: "POST",
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
            let token = getToken();
            const res = await fetch(HTTP_REFS + PAGE_SIZE, {
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
        }
    }
};
</script>
