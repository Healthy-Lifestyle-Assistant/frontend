<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div>
            <BreadcrumbWorkoutsComponent />
            <AlertComponent :message="message" :messageType="messageType" /><br>
            <ButtonComponent link="/workouts-create-exercise" title="New Exercise" />
            <br><br>
        </div>

        <!-- Custom Exercises -->
        <h6 v-if="customExercises && customExercises.length > 0" class="text-secondary mt-3 mb-4">Custom Exercises</h6>

        <div v-if="customExercises && customExercises.length > 0" class="d-flex flex-column w-100">

            <div v-for="exercise in customExercises" :key="exercise.id">
                <ExerciseComponent :id="exercise.id" :title="exercise.title" :description="exercise.description"
                    :bodyParts="exercise.bodyParts" :isCustom="exercise.custom" :needsEquipment="exercise.needsEquipment" />
            </div>

        </div>

        <!-- Default Exercises -->
        <h6 v-if="defaultExercises" class="text-secondary mt-3 mb-4">Default Exercises</h6>

        <div v-if="defaultExercises" class="d-flex flex-column w-100">

            <div v-for="exercise in defaultExercises" :key="exercise.id">
                <ExerciseComponent :id="exercise.id" :title="exercise.title" :description="exercise.description"
                    :bodyParts="exercise.bodyParts" :isCustom="exercise.custom" :needsEquipment="exercise.needsEquipment" />
            </div>

        </div>

    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { getAndValidateToken } from "../../shared/js/common.js";
import ExerciseComponent from "../components/ExerciseComponent.vue";
import BreadcrumbWorkoutsComponent from "../components/BreadcrumbWorkoutsComponent.vue";
import AlertComponent from "../../shared/components/AlertComponent.vue";
import ButtonComponent from "../../shared/components/ButtonComponent.vue";

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
            message: "",
            messageType: ""
        };
    },

    components: {
        ExerciseComponent,
        BreadcrumbWorkoutsComponent,
        AlertComponent,
        ButtonComponent
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
                this.messageType = "WARNING";
                this.message = `An error occured (${res.body.message} ${res.status})`;
            }
        } catch (error) {
            this.messageType = "WARNING";
            this.message = `An error occurred (${error})`;
        }

        if (!token) {
            this.$store.commit("setLogged", false);
            this.messageType = "SECONDARY";
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
                    this.messageType = "WARNING";
                    this.message = `An error occured (${res.body.message} ${res.status})`;
                }
            } catch (error) {
                this.messageType = "WARNING";
                this.message = `An error occurred (${error})`;
            }
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
