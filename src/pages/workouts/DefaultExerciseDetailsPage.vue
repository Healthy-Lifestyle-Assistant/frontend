<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <AlertComponent :messageType="'SECONDARY'" :message="authAlertMessage" />

        <BreadcrumbWorkoutsComponent />
        
        <div v-if="!isUnlogged">
            <br>
                <router-link to="/workouts-create-exercise" class="btn btn-outline-secondary" role="button">New Exercise</router-link>
            <br><br>
        </div>

        <!-- Default Exercise Details -->
        <div v-if="exercise">
            <ExerciseDetailsComponent :title="exercise.title" :description="exercise.description" :bodyParts="exercise.bodyParts"
                :isCustom="exercise.isCustom" :needsEquipment="exercise.needsEquipment" :httpRefs="exercise.httpRefs" />
        </div>

        <AlertComponent :messageType="'WARNING'" :message="exerciseAlertMessage" />
        <AlertComponent :messageType="'WARNING'" :message="requestAlertMessage" />

    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { getAndValidateToken } from "../common/common.js";
import BreadcrumbWorkoutsComponent from "../../components/workouts/BreadcrumbWorkoutsComponent.vue";
import ExerciseDetailsComponent from "../../components/workouts/ExerciseDetailsComponent.vue";
import AlertComponent from "../../components/common/AlertComponent.vue";

export default {
    name: "DefaultExerciseDetailsPage",

    setup() {
        useMeta({
            title: "Healthy - Default Exercise Details",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            exercise: null,
            authAlertMessage: "",
            exerciseAlertMessage: "",
            requestAlertMessage: "",
            message: ""
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", `/workouts-exercise-details/default/${this.$route.params.id}`);

        const token = await getAndValidateToken();

        if (!token) {
            this.$store.commit("setLogged", false);
            this.authAlertMessage = "You are unlogged";
        }else{
            this.$store.commit("setLogged", true);
        }

        try {
            const res = await this.getDefaultExercise();
            if(res.status == 200) this.exercise = res.body;
            else if(res.status == 400) this.requestAlertMessage = "error: Bad request";
            else this.exerciseAlertMessage = "error: Exercise is unavailable";
        } catch (error) {
            this.message = `An error occurred (${error})`;
        }

    },

    components: {
        BreadcrumbWorkoutsComponent,
        ExerciseDetailsComponent,
        AlertComponent
    },

    computed: {
        isUnlogged() {
            return this.authAlertMessage.includes("unlogged");
        }
    },

     methods: {
        async getDefaultExercise() {
            let URL = `/api/v1/workouts/exercises/default/${this.$route.params.id}`;

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
}
</script>