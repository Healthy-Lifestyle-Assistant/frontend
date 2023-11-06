<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <AlertComponent :isUnlogged="isUnlogged" :isError="isError" :message="message" />

        <div>
            <BreadcrumbWorkoutsComponent />
            <br>
            <router-link to="/workouts-create-exercise" class="btn btn-outline-secondary" role="button">New Exercise</router-link>
            <br><br>
        </div>

        <!-- Custom Exercises -->
        <div v-if="customExercises" class="d-flex flex-wrap">

            <div v-for="exercise in customExercises" :key="exercise.id">
                <ExerciseComponent :id="exercise.id" :title="exercise.title" :description="exercise.description"
                    :bodyParts="exercise.bodyParts" :isCustom="exercise.custom" :needsEquipment="exercise.needsEquipment" />
            </div>

        </div>

        <!-- Default Exercises -->
        <div v-if="defaultExercises" class="d-flex flex-wrap">

            <div v-for="exercise in defaultExercises" :key="exercise.id">
                <ExerciseComponent :id="exercise.id" :title="exercise.title" :description="exercise.description"
                    :bodyParts="exercise.bodyParts" :isCustom="exercise.custom" :needsEquipment="exercise.needsEquipment" />
            </div>

        </div>

    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import ExerciseComponent from "../../components/workouts/ExerciseComponent.vue";
import { getAndValidateToken } from "../common/common.js";
import BreadcrumbWorkoutsComponent from "../../components/workouts/BreadcrumbWorkoutsComponent.vue";
import AlertComponent from "../../components/common/AlertComponent.vue";

export default {
    name: "ExercisesPage",

    setup() {
        useMeta({
            title: "Healthy - Exercises",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            defaultExercises: null,
            customExercises: null,
            message: ""
        };
    },

    components: {
        ExerciseComponent,
        BreadcrumbWorkoutsComponent,
        AlertComponent
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-exercises");

        const token = await getAndValidateToken();

        try {
            const res = await this.getDefaultExercises();

            if (res.status === 200) {
                this.defaultExercises = res.body;
            }
            else {
                this.message = `An error occured (${res.body.message} ${res.status})`;
            }
        } catch (error) {
            this.message = `An error occurred (${error})`;
        }

        if (!token) {
            this.$store.commit("setLogged", false);
            this.message = "You are unlogged";
        } else {
            this.$store.commit("setLogged", true);

            try {
                const res = await this.getCustomExercises(token);

                if (res.status === 200) {
                    this.customExercises = res.body;
                }
                else if (res.status === 401) {
                    this.$router.push("/login");
                }
                else {
                    this.message = `An error occured (${res.body.message} ${res.status})`;
                }
            } catch (error) {
                this.message = `An error occurred (${error})`;
            }
        }
    },

    computed: {
        isError() {
            return this.message.includes("error");
        },

        isUnlogged() {
            return this.message.includes("unlogged");
        }
    },

    methods: {
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
