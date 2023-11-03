<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-center">

        <AlertComponent :isUnlogged="isUnlogged" :isError="isError" :message="message" />

        <form @submit.prevent="submitForm" style="width: fit-content;">
            <div class="mb-3">
                <label for="title" class="form-label">Title (Required)</label>
                <input type="text" class="form-control" id="title" v-model="title" required>
            </div>

            <div class="mb-3">
                <label for="description" class="form-label">Description (Optional)</label>
                <input type="text" class="form-control" id="description" v-model="description">
            </div>

            <div class="form-check mb-3">
                <input type="checkbox" value="" class="form-check-input" id="needsEquipment" v-model="needsEquipment">
                <label for="needsEquipment" class="form-check-label">Needs Equipment</label>
            </div>

            <div v-if="bodyParts" class="mb-3">
                <select id="bodyParts" v-model="bodyPartIds" class="form-select" multiple aria-label="Select body parts"
                    required>
                    <option disabled>Body Parts (Required)</option>
                    <option v-for="elt in bodyParts" :key="elt.id" :value="elt.id">{{ elt.name }}</option>
                </select>
            </div>

            <div v-if="httpRefs" class="mb-3">
                <select id="httpRefs" v-model="httpRefIds" class="form-select" multiple
                    aria-label="Select media references">
                    <option disabled>Media References (Optional)</option>
                    <option v-for="elt in httpRefs" :key="elt.id" :value="elt.id">{{ elt.name }}</option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary mt-4">Create</button>
        </form>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { getToken } from "../common/common.js";
import { getAndValidateToken } from "../common/common.js";
import AlertComponent from "../../components/common/AlertComponent.vue";

export default {
    name: "CreateExercisePage",

    setup() {
        useMeta({
            title: "Healthy - Create Exercise",
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
            bodyParts: [],
            httpRefs: []
        };
    },

    components: {
        AlertComponent
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
            this.httpRefs = httpRefsResponse.body;
        }
    },

    computed: {
        isSuccess() {
            return this.message.includes("success");
        },

        isError() {
            return this.message.includes("error");
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
                    this.message = "Exercise has been created successfully";
                } else {
                    this.message = `An error occured (${res.body.message} ${res.status})`;
                }
            } catch (error) {
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
            let URL = "/api/v1/workouts/httpRefs/default";

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
