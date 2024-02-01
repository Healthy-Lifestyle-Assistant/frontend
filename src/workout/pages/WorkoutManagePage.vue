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

            <div class="mb-2">Exercises<span class="span-color"> *</span></div>
            <div v-if="allExercises && allExercises.length > 0" class="d-flex flex-row flex-wrap mb-4">
                <div v-for="exercise in allExercises" :key="exercise.id" class="me-2 mb-2">
                    <input type="checkbox" value="" class="form-check-input" :id="exercise.title"
                        @click="onClickExerciseCheckbox(exercise.id)" :checked="exercisesStates[exercise.id]">
                    <label :for="exercise.title" class="form-check-label">{{ exercise.title }}
                        ({{ exercise.bodyParts.map(part =>
                            part.name.charAt(0).toLowerCase() + part.name.slice(1)).join(', ') }})
                    </label>
                </div>
            </div>

            <button type="submit" class="btn btn-secondary mt-2">Update</button>
        </form>

        <!-- Delete workout -->
        <div v-if="!isDeleted" class="form-width">
            <h4 class="mb-2 text-muted">Delete Workout</h4>
            <div class="mb-2">Deletion of the workout will not affect associated exercises and media references.</div>
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
import { WORKOUTS_SLASH, EXERCISES, PAGE_SIZE } from "../../shared/URL.js";
import { SUCCESS, WARNING, WORKOUT_UPDATED_SUCCESSFULLY, WORKOUT_DELETED_SUCCESSFULLY } from "../../shared/MESSAGE.js";
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
            exercisesStates: {},

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
        this.$store.commit("setCurrentUrl", `/workouts-manage-workout/${this.$route.params.id}`);
        const token = await getAndValidateToken();
        if (!token) {
            this.$store.commit("setLogged", false);
            this.$router.push("/login");
        } else {
            this.$store.commit("setLogged", true);
            let responseWorkoutDetails = await this.getWorkoutDetails(this.$route.params.id, token);
            let responseExercises = await this.getAllExercises(token);
            this.allExercises = responseExercises.body.content;

            if (responseWorkoutDetails.status === 200) {
                this.titleLabel = responseWorkoutDetails.body.title;
                this.descriptionLabel = responseWorkoutDetails.body.description;
                this.exercises = responseWorkoutDetails.body.exercises;
                this.exercisesIds = this.exercises.map(exercise => exercise.id);
                this.exercisesIds.forEach(id => {
                    this.exercisesStates[id] = true;
                });
            } else if (responseWorkoutDetails.status === 401) {
                this.$router.push("/login");
            } else {
                this.messageType = WARNING;
                this.message = `Error: ${responseWorkoutDetails.body.message}`;
            }
        }
    },

    methods: {
        async onSubmitUpdateForm() {
            const requestDto = {
                title: this.title,
                description: this.description,
                exerciseIds: this.exercisesIds
            };

            if (this.exercisesIds === null || this.exercisesIds.length === 0) {
                alert("Workout should be associated with at least one exercise.")
            } else {
                const token = getToken();
                const res = await this.updateWorkout(requestDto, token);

                if (res.status === 200) {
                    this.messageType = SUCCESS;
                    this.message = WORKOUT_UPDATED_SUCCESSFULLY;

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
                    this.messageType = WARNING;
                    this.message = messageBuilder;
                }
            }
        },

        async onSubmitDeleteForm() {
            try {
                const token = getToken();
                const res = await this.deleteWorkout(this.$route.params.id, token);

                if (res.status === 204) {
                    this.messageType = SUCCESS;
                    this.message = WORKOUT_DELETED_SUCCESSFULLY;
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

        onClickExerciseCheckbox(id) {
            if (this.exercisesIds.includes(id)) {
                let index = this.exercisesIds.indexOf(id);
                this.exercisesIds.splice(index, 1);
                delete this.exercisesStates[id];
            } else {
                this.exercisesIds.push(id);
                this.exercisesStates[id] = true;
            }
        },

        async getWorkoutDetails(id, token) {
            let URL = WORKOUTS_SLASH + id;
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

        async getAllExercises(token) {
            let URL = EXERCISES + PAGE_SIZE;
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

        async updateWorkout(requestBody, token) {
            let URL = WORKOUTS_SLASH + this.$route.params.id;
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
            let URL = WORKOUTS_SLASH + id;
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
