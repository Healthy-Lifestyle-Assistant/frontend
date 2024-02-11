<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">
        <div>
            <BreadcrumbWorkoutsComponent />
            <AlertListComponent :alerts="alerts" />
            <AlertComponent :message="message" :messageType="messageType" />
        </div>

        <div v-if="workout" class="w-100">
            <WorkoutDetailsComponent :id="workout.id" :title="workout.title" :description="workout.description"
                :bodyParts="workout.bodyParts" :isCustom="workout.isCustom" :needsEquipment="workout.needsEquipment"
                :exercises="workout.exercises" />
        </div>

    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { getAndValidateToken, on401 } from "@/shared/js/auth";
import { buildAlertsList } from "@/shared/js/exceptions";
import { WORKOUTS_SLASH, WORKOUTS_DEFAULT_SLASH } from "@/shared/URL";
import { SECONDARY, YOUR_ARE_UNLOGGED, WARNING } from "@/shared/Messages";
import AlertComponent from "@/shared/components/AlertComponent.vue";
import AlertListComponent from "@/shared/components/AlertListComponent.vue";
import WorkoutDetailsComponent from "../components/WorkoutDetailsComponent.vue";
import BreadcrumbWorkoutsComponent from "../components/BreadcrumbWorkoutsComponent.vue";

export default {
    name: "WorkoutDetailsPage",

    components: {
        BreadcrumbWorkoutsComponent,
        WorkoutDetailsComponent,
        AlertComponent,
        AlertListComponent
    },

    setup() {
        useMeta({
            title: "Workout Details",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            workout: null,

            message: null,
            messageType: null,
            alerts: []
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", this.$route.path);
        const token = await getAndValidateToken(this);

        if (this.$route.path.includes("default")) {
            if (!token) {
                this.$store.commit("setLogged", false);
                this.messageType = SECONDARY;
                this.message = YOUR_ARE_UNLOGGED;
            } else {
                this.$store.commit("setLogged", true);
            }

            const response = await this.getDefaultWorkoutDetails();
            if (response.status === 200) {
                this.workout = response.body;
            } else {
                this.alerts = buildAlertsList(response.body, WARNING);
            }
        }

        if (!token && this.$route.path.includes("custom")) {
            this.$store.commit("setLogged", false);
            this.$router.push("/login");
        }

        if (token && this.$route.path.includes("custom")) {
            const response = await this.getCustomWorkoutDetails(token);
            if (response.status === 200) {
                this.workout = response.body;
            } else if (response.status === 401) {
                on401(this);
            } else {
                this.alerts = buildAlertsList(response.body, WARNING);
            }
        }
    },

    methods: {
        async getDefaultWorkoutDetails() {
            let URL = WORKOUTS_DEFAULT_SLASH + this.$route.params.id;
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            return {
                status: response.status,
                body: data
            };
        },

        async getCustomWorkoutDetails(token) {
            let URL = WORKOUTS_SLASH + this.$route.params.id;
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            return {
                status: response.status,
                body: data
            };
        }
    }
}
</script>