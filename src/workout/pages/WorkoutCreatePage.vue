<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div>
            <BreadcrumbWorkoutsComponent />
            <AlertComponent :message="message" :messageType="messageType" /><br>
        </div>

        <h4 class="mb-4 text-muted">Create Workout</h4>

        <form @submit.prevent="onSubmitForm" class="mb-5 form-width">
            <div class="mb-4">
                <label for="title" class="form-label">Title<span class="span-color"> *</span></label>
                <input type="text" class="form-control" id="title" v-model="title" placeholder="Enter title" required>
            </div>

            <div class="mb-4">
                <label for="description" class="form-label">Description</label>
                <textarea rows="3" class="form-control" id="description" v-model="description"
                    placeholder="Enter description (optional)"></textarea>
            </div>

            <div class="mb-2">Exercises<span class="span-color"> *</span></div>
            <div v-if="exercises && exercises.length > 0" class="d-flex flex-row flex-wrap mb-4">
                <div v-for="exercise in exercises" :key="exercise.id" class="me-2 mb-2">
                    <input type="checkbox" value="" class="form-check-input" :id="exercise.title"
                        @click="onClickExerciseCheckbox(exercise.id)" :checked="exercisesStates[exercise.id]">
                    <label :for="exercise.title" class="form-check-label">{{ exercise.title }}
                        ({{ exercise.bodyParts.map(part =>
                            part.name.charAt(0).toLowerCase() + part.name.slice(1)).join(', ') }})
                    </label>
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
import { WORKOUTS, EXERCISES, PAGE_SIZE } from "../../shared/URL.js";
import { SUCCESS, WARNING, WORKOUT_CREATED_SUCCESSFULLY } from "../../shared/MESSAGE.js";
import AlertComponent from "../../shared/components/AlertComponent.vue";
import BreadcrumbWorkoutsComponent from "../components/BreadcrumbWorkoutsComponent.vue";

export default {
    name: "WorkoutCreatePage",

    setup() {
        useMeta({
            title: "Create Workout",
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
            exercisesStates: {},
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
            let response = await this.getExercises(token);
            this.exercises = response.body.content;
        }
    },

    methods: {
        async onSubmitForm() {
            const requestDto = {
                title: this.title,
                description: this.description,
                exerciseIds: this.exerciseIds
            };

            if (this.exerciseIds === null || this.exerciseIds.length === 0) {
                alert("Workout should be associated with at least one exercise.")
            } else {
                const res = await this.createWorkout(requestDto);
                if (res.status === 201) {
                    this.messageType = SUCCESS;
                    this.message = WORKOUT_CREATED_SUCCESSFULLY;
                } else {
                    let messageBuilder = "";
                    for (const key in res.body) {
                        messageBuilder += `${key}: ${res.body[key]}. `;
                    }
                    this.messageType = WARNING;
                    this.message = messageBuilder;
                }
                this.title = null;
                this.description = null;
                this.exerciseIds = [];
                this.exercisesStates = {};
            }
        },

        onClickExerciseCheckbox(id) {
            if (this.exerciseIds.includes(id)) {
                let index = this.exerciseIds.indexOf(id);
                this.exerciseIds.splice(index, 1);
                delete this.exercisesStates[id];
            } else {
                this.exerciseIds.push(id);
                this.exercisesStates[id] = true;
            }
        },

        async createWorkout(requestBody) {
            let token = getToken();
            const res = await fetch(WORKOUTS, {
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

        async getExercises(token) {
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
        }
    }
};
</script>
