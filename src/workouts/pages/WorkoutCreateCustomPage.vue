<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div>
            <BreadcrumbWorkoutsComponent />
            <AlertComponent :message="message" :messageType="messageType" /><br>
        </div>

        <h4 class="mb-4">Create Workout</h4>

        <form @submit.prevent="submitForm" style="width: fit-content;" class="mb-5">
            <div class="mb-4">
                <label for="title" class="form-label">Title<span style="color: red;">*</span></label>
                <input type="text" class="form-control" id="title" v-model="title" placeholder="Workout Title" required>
            </div>

            <div class="mb-4">
                <label for="description" class="form-label">Description</label>
                <input type="text" class="form-control" id="description" v-model="description" placeholder="Workout Description">
            </div>


            <div v-if="exercises" class="mb-4">
                <label for="exercises" class="form-label">Exercises<span style="color: red;">*</span></label>
                <select id="exercises" v-model="exerciseIds" class="form-select" multiple aria-label="Select Exercises"
                    required>
                    <option v-for="exercise in exercises" :key="exercise.id" :value="exercise.id">{{ exercise.title }}</option>
                </select>
            </div>

            <div>
                <span style="color: red;">*</span> Required Fields
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
    name: "WorkoutCreateCustomPage",

    setup() {
        useMeta({
            title: "Healthy - Create Workout",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            title: null,
            description: null,
            exercises: [],
            exerciseIds: [],
            message: null,
            messageType: null,
        };
    },

    components: {
        AlertComponent,
        BreadcrumbWorkoutsComponent
    },
    
    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-create-workout");

        const token = await getAndValidateToken();

        if (!token) {
            this.$store.commit("setLogged", false);
            this.$router.push("/login");
        } else {
            this.$store.commit("setLogged", true);

            let defaultExercisesResponse = await this.getDefaultExercises();
            this.exercises = defaultExercisesResponse.body;

            let customExercisesResponse = await this.getCustomExercises(token);
            this.exercises = this.exercises.concat(customExercisesResponse.body);
        }
    },

    methods: {
        async submitForm() {
            const requestDto = {
                title: this.title,
                description: this.description,
                exerciseIds: this.exerciseIds
            };

            try {
                const res = await this.createWorkout(requestDto);

                if (res.status === 201) {
                    this.messageType = "SUCCESS";
                    this.message = "Workout has been created successfully";
                } else {
                    this.messageType = "WARNING";
                    this.message = `An error occured (${res.body.message} ${res.status})`;
                }
            } catch (error) {
                this.messageType = "WARNING";
                this.message = `An error occurred (${error})`;
            }

            this.title = null;
            this.description = null;
            this.exerciseIds = [];
        },

        async createWorkout(requestBody) {
            let URL = "/api/v1/workouts";
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

        async getDefaultExercises() {
            let URL = "/api/v1/workouts/exercises/default";

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

        async getCustomExercises(token) {
            let URL = "/api/v1/workouts/exercises";

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
        }
    }
};
</script>
