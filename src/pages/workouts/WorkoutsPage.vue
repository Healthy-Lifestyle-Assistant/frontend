<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div>
            <BreadcrumbWorkoutsComponent />
            <br>
            <router-link to="" class="btn btn-primary" role="button">New Workout</router-link>
            <br><br>
        </div>

        <div v-if="workouts" class="d-flex flex-wrap">

            <div v-for="workout in workouts" :key="workout.id">
                <WorkoutComponent :title="workout.title" :description="workout.description" :bodyParts="workout.bodyParts"
                    :custom="workout.custom" :needsEquipment="workout.needsEquipment" :exercises="workout.exercises" />
            </div>

        </div>

    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import WorkoutComponent from "../../components/workouts/WorkoutComponent.vue";
import BreadcrumbWorkoutsComponent from "../../components/workouts/BreadcrumbWorkoutsComponent.vue"

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
            workouts: null,
            message: ""
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts");

        const isTokenValid = await this.validateToken();

        if (isTokenValid) {
            this.$store.commit("setLogged", true);
            // 
        } else {
            try {
                this.$store.commit("setLogged", false);

                const res = await this.getDefaultWorkouts();

                if (res.status === 200) {
                    this.workouts = res.body;
                }
                else if (res.status === 401) {
                    this.$router.push("/login");
                }
                else {
                    this.message = `Unexpected response status (${res.status})`;
                }
            } catch (error) {
                this.message = "An error occurred";
            }
        }
    },

    components: {
        WorkoutComponent,
        BreadcrumbWorkoutsComponent
    },

    methods: {
        async validateToken() {
            const token = localStorage.getItem("token");

            if (token === null || token === "") {
                return false;
            } else {
                // GET /api/v1/auth/validate
                return false;
            }
        },

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
