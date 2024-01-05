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
        <h4 v-if="!isDeleted" class="mb-4 text-muted">Manage Exercise</h4>

        <form v-if="!isDeleted" class="mb-5" @submit.prevent="submitForm" style="width: fit-content;">
            <div class="mb-4">
                <label for="title" class="form-label">Current title: {{ this.titleLabel }}</label>
                <input type="text" class="form-control" id="title" v-model="title" placeholder="Enter new title">
            </div>

            <div class="mb-4">
                <label for="description" class="form-label">Current descirption: {{ this.descriptionLabel ? this.descriptionLabel : "None"
                }}</label>
                <input type="text" class="form-control" id="description" v-model="description"
                    placeholder="Enter new description">
            </div>

            <div class="form-check mb-4">
                <input type="checkbox" value="" class="form-check-input" id="needsEquipment" v-model="needsEquipment"
                    @change="handleCheckboxChange">
                <label for="needsEquipment" class="form-check-label">Needs Equipment</label>
            </div>

            <div v-if="exerciseBodyParts" class="mb-4">
                <label for="bodyParts" class="form-label">Select body parts (hold Ctrl to select multiple)</label>
                <select id="bodyParts" v-model="bodyPartIds" class="form-select" multiple aria-label="Select Body Parts" :size="exerciseBodyParts.length"
                    required>
                    <option v-for="bodyPart in exerciseBodyParts" :key="bodyPart.id" :value="bodyPart.id">{{ bodyPart.name
                    }}</option>
                </select>
            </div>

            <div v-if="exerciseHttpRefs" class="mb-4">
                <label for="httpRefs" class="form-label">Select media (hold Ctrl to select multiple)</label>
                <select id="httpRefs" v-model="httpRefIds" class="form-select" multiple aria-label="Select Media" :size="exerciseHttpRefs.length" required>
                    <option v-for="httpRef in exerciseHttpRefs" :key="httpRef.id" :value="httpRef.id">{{ httpRef.name }}
                    </option>
                </select>
            </div>

            <button type="submit" class="btn btn-secondary mt-4">Update</button>
        </form>

        <!-- Delete media -->
        <h4 v-if="!isDeleted" class="mb-2">Delete Exercise</h4>

        <form v-if="!isDeleted" @submit.prevent="submitFormDelete" style="min-width: 13rem; width: fit-content;"
            class="mb-5">
            <button type="submit" class="btn btn-warning mt-4">Delete</button>
        </form>
        <br>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { getToken } from "../../shared/js/common.js";
import { getAndValidateToken } from "../../shared/js/common.js";
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

            message: "",
            messageType: "",
            isDeleted: false
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
            await this.getAllBodyParts();
            await this.getAllUserHttpRefs();
            await this.getDefaultHttpRefs();

            this.exerciseBodyParts = this.exerciseBodyParts.concat(
                this.allBodyParts.filter(item => !this.exerciseBodyParts.some(elt => elt.id === item.id))
            );
            this.exerciseHttpRefs = this.exerciseHttpRefs.concat(
                this.allHttpRefs.filter(item => !this.exerciseHttpRefs.some(elt => elt.id === item.id))
            );
        }
    },

    methods: {
        async submitForm() {
            const requestDto = {
                title: this.title,
                description: this.description,
                needsEquipment: this.needsEquipmentChanged ? this.needsEquipment : null,
                bodyPartIds: this.bodyPartIds,
                httpRefIds: this.httpRefIds
            };

            try {
                const res = await this.updateExercise(requestDto);

                if (res.status === 200) {
                    this.messageType = "SUCCESS";
                    this.message = "Exercise has been updated successfully";

                    this.titleLabel = res.body.title;
                    this.descriptionLabel = res.body.description;
                    this.title = null;
                    this.description = null;
                    this.needsEquipment = res.body.needsEquipment;
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
                    this.messageType = "WARNING";
                    this.message = `An error occured (${messageBuilder}Status ${res.status})`;
                }
            } catch (error) {
                this.messageType = "WARNING";
                this.message = `An error occurred (${error})`;
            }
        },

        async submitFormDelete() {
            try {
                const res = await this.deleteExercise(this.$route.params.id);

                if (res.status === 204) {
                    this.messageType = "SUCCESS";
                    this.message = "Exercise has been deleted successfully";
                    this.isDeleted = true;
                } else {
                    this.messageType = "WARNING";
                    this.message = `An error occurred (${res.status})`;
                }
            } catch (error) {
                this.messageType = "WARNING";
                this.message = `An error occurred (${error})`;
            }
        },

        async getExerciseDetails(id) {
            let URL = `/api/v1/workouts/exercises/${id}`;
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
        },

        async getAllBodyParts() {
            let URL = "/api/v1/workouts/bodyParts";

            const res = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            this.allBodyParts = this.allBodyParts.concat(data);
        },

        async getAllUserHttpRefs() {
            let URL = "/api/v1/workouts/httpRefs";
            let token = getToken();

            const res = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();

            this.allHttpRefs = this.allHttpRefs.concat(data);
        },

        async getDefaultHttpRefs() {
            let URL = "/api/v1/workouts/httpRefs/default";

            const res = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            this.allHttpRefs = this.allHttpRefs.concat(data);
        },

        async updateExercise(requestBody) {
            let URL = `/api/v1/workouts/exercises/${this.$route.params.id}`;
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
            let URL = `/api/v1/workouts/exercises/${id}`;
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
        },

        handleCheckboxChange() {
            this.needsEquipmentChanged = !this.needsEquipmentChanged;
        }
    }
};
</script>
