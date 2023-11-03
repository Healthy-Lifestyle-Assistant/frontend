<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <AlertComponent :isUnlogged="isUnlogged" :isError="isError" :message="message" />

        <div>
            <BreadcrumbWorkoutsComponent />
            <br>
            <router-link to="" class="btn btn-outline-secondary" role="button">New Workout</router-link>
            <br><br>
        </div>

        <!-- Custom Workouts -->
        <div v-if="customWorkouts" class="d-flex flex-wrap">

            <div v-for="workout in customWorkouts" :key="workout.id">
                <WorkoutComponent :title="workout.title" :description="workout.description" :bodyParts="workout.bodyParts"
                    :custom="workout.custom" :needsEquipment="workout.needsEquipment" :exercises="workout.exercises" />
            </div>

        </div>

        <!-- Default Workouts -->
        <div v-if="defaultWorkouts" class="d-flex flex-wrap">

            <div v-for="workout in defaultWorkouts" :key="workout.id">
                <WorkoutComponent :title="workout.title" :description="workout.description" :bodyParts="workout.bodyParts"
                    :custom="workout.custom" :needsEquipment="workout.needsEquipment" :exercises="workout.exercises" />
            </div>

        </div>

    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import WorkoutComponent from "../../components/workouts/WorkoutComponent.vue";
import BreadcrumbWorkoutsComponent from "../../components/workouts/BreadcrumbWorkoutsComponent.vue";
import { getAndValidateToken } from "../common/common.js";
import AlertComponent from "../../components/common/AlertComponent.vue";

export default {
    name: "WorkoutsPage",

    setup() {
        useMeta({
            title: "Healthy - Workouts",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            defaultWorkouts: null,
            customWorkouts: null,
            message: ""
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts");

        const token = await getAndValidateToken();

        try {
            const res = await this.getDefaultWorkouts();

            if (res.status === 200) {
                this.defaultWorkouts = res.body;
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

            // Retrieve Custom Workouts

            // try {
            //     const res = await this.getCustomWorkouts(token);

            //     if (res.status === 200) {
            //         this.customWorkouts = res.body;
            //     }
            //     else if (res.status === 401) {
            //         this.$router.push("/login");
            //     }
            //     else {
            //         this.message = `An error occured (${res.body.message} ${res.status})`;
            //     }
            // } catch (error) {
            //     this.message = `An error occurred (${error})`;
            // }
        }
    },

    components: {
        WorkoutComponent,
        BreadcrumbWorkoutsComponent,
        AlertComponent
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
        async getDefaultWorkouts() {
            let URL = "/api/v1/workouts/default";

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
