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

        <form @submit.prevent="submitForm" style="width: fit-content;" class="mb-5">
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

            <div v-if="bodyParts" class="mb-5">
                <label for="bodyParts" class="form-label">Select body parts (hold Ctrl to select multiple)<span
                        class="span-color"> *</span></label>
                <select id="bodyParts" v-model="bodyPartIds" class="form-select" multiple aria-label="Select body parts"
                    :size="bodyParts.length" required>
                    <option v-for="elt in bodyParts" :key="elt.id" :value="elt.id">{{ elt.name }}</option>
                </select>
            </div>

            <div v-if="httpRefs" class="mb-4">
                <label for="httpRefs" class="form-label">Select media (hold Ctrl to select multiple)</label>
                <select id="httpRefs" v-model="httpRefIds" class="form-select" multiple aria-label="Select media references"
                    :size="httpRefs.length">
                    <option v-for="elt in httpRefs" :key="elt.id" :value="elt.id">{{ elt.name }}</option>
                </select>
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
import { getToken } from "../../shared/js/common.js";
import { getAndValidateToken } from "../../shared/js/common.js";
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
            httpRefs: []
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
        async submitForm() {
            const requestDto = {
                title: this.title,
                description: this.description,
                needsEquipment: this.needsEquipment,
                bodyParts: this.bodyPartIds,
                httpRefs: this.httpRefIds
            };

            try {
                const res = await this.createExercise(requestDto);

                if (res.status === 201) {
                    this.messageType = "SUCCESS";
                    this.message = "Exercise has been created successfully";
                } else {
                    this.messageType = "WARNING";
                    this.message = `An error occured (${res.body.message} ${res.status})`;
                }
            } catch (error) {
                this.messageType = "WARNING";
                this.message = `An error occurred (${error})`;
            }

            this.title = "";
            this.description = "";
            this.bodyPartIds = [];
            this.httpRefIds = [];
            this.needsEquipment = false;
        },

        async createExercise(requestBody) {
            let URL = "/api/v1/workouts/exercises";
            let token = getToken();

            const res = await fetch(URL, {
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
            let URL = "/api/v1/workouts/bodyParts";

            const res = await fetch(URL, {
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
            let URL = "/api/v1/workouts/httpRefs/default?pageSize=1000";

            const res = await fetch(URL, {
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
        }
    }
};
</script>
