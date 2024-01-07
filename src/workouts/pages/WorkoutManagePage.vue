<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div>
            <BreadcrumbWorkoutsComponent />
            <AlertComponent :message="message" :messageType="messageType" /><br>
        </div>

        <!-- Update Workout -->
        <h4 v-if="!isDeleted" class="mb-4 text-muted">Update Workout</h4>

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

            <div v-if="allExercises && allExercises.length > 0" class="mb-4">
                <label for="exercises" class="form-label">Select exercises (hold Ctrl to select multiple)</label>
                <select id="exercises" v-model="exercisesIds" class="form-select" multiple aria-label="Select exercises" :size="allExercises.length" required>
                    <option v-for="exercise in allExercises" :key="exercise.id" :value="exercise.id">{{ exercise.title }}
                        ({{ exercise.bodyParts.map(part =>
                            part.name.charAt(0).toLowerCase() + part.name.slice(1)).join(', ') }})
                    </option>
                </select>
            </div>

            <button type="submit" class="btn btn-secondary mt-4">Update</button>
        </form>

        <!-- Delete workout -->
        <h4 v-if="!isDeleted" class="mb-2 text-muted">Delete Workout</h4>

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
    name: "WorkoutManagePage",

    setup() {
        useMeta({
            title: "Manage Workout",
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
            exercises: [],
            allExercises: [],

            exercisesIds: [],

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
        this.$store.commit("setCurrentUrl", `/workouts-manage-workout/${this.$route.params.id}`);

        const token = await getAndValidateToken();

        if (!token) {
            this.$store.commit("setLogged", false);
            this.$router.push("/login");
        } else {
            this.$store.commit("setLogged", true);

            try {
                let res = await this.getWorkoutDetails(this.$route.params.id, token);
                await this.getAllDefaultExercises();
                await this.getAllCustomExercises(token);

                if (res.status === 200) {
                    this.titleLabel = res.body.title;
                    this.descriptionLabel = res.body.description;
                    this.exercises = res.body.exercises;
                    this.exercisesIds = this.exercises.map(exercise => exercise.id);
                }
                else if (res.status === 401) {
                    this.$router.push("/login");
                }
                else {
                    this.messageType = "WARNING";
                    this.message = `Error: ${res.body.message} (${res.status})`;
                }
            } catch (error) {
                this.messageType = "WARNING";
                this.message = `Error: ${error}`;
            }
        }
    },

    methods: {
        async submitForm() {
            const requestDto = {
                title: this.title,
                description: this.description,
                exerciseIds: this.exercisesIds
            };

            try {
                const token = getToken();
                const res = await this.updateWorkout(requestDto, token);

                if (res.status === 200) {
                    this.messageType = "SUCCESS";
                    this.message = "Workout has been updated successfully";

                    this.titleLabel = res.body.title;
                    this.descriptionLabel = res.body.description;
                    this.title = null;
                    this.description = null;
                    this.workout = res.body;
                    this.exercisesIds = this.workout.exercises.map(exercise => exercise.id);
                } else {
                    let messageBuilder = "";
                    for (const key in res.body) {
                        messageBuilder += `${key}: ${res.body[key]}. `;
                    }
                    this.messageType = "WARNING";
                    this.message = `Error: ${messageBuilder}(status ${res.status})`;
                }
            } catch (error) {
                this.messageType = "WARNING";
                this.message = `Error: ${error}`;
            }
        },

        async submitFormDelete() {
            try {
                const token = getToken();
                const res = await this.deleteWorkout(this.$route.params.id, token);

                if (res.status === 204) {
                    this.messageType = "SUCCESS";
                    this.message = "Workout has been deleted successfully";
                    this.isDeleted = true;
                } else {
                    this.messageType = "WARNING";
                    this.message = `Error: ${res.status}`;
                }
            } catch (error) {
                this.messageType = "WARNING";
                this.message = `Error: ${error}`;
            }
        },

        async getWorkoutDetails(id, token) {
            let URL = `/api/v1/workouts/${id}`;

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

        async getAllDefaultExercises() {
            let URL = "/api/v1/workouts/exercises/default";

            const res = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            this.allExercises = this.allExercises.concat(data);
        },

        async getAllCustomExercises(token) {
            let URL = "/api/v1/workouts/exercises";

            const res = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();
            this.allExercises = this.allExercises.concat(data);
        },

        async updateWorkout(requestBody, token) {
            let URL = `/api/v1/workouts/${this.$route.params.id}`;

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

        async deleteWorkout(id, token) {
            let URL = `/api/v1/workouts/${id}`;

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
