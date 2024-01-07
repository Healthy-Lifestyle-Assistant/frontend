<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">
        <BreadcrumbWorkoutsComponent />
        <AlertComponent :message="message" :messageType="messageType" /> <br>

        <div v-if="workout" class="w-100">
            <WorkoutDetailsComponent :id="workout.id" :title="workout.title" :description="workout.description"
                :bodyParts="workout.bodyParts" :isCustom="workout.isCustom" :needsEquipment="workout.needsEquipment"
                :exercises="workout.exercises" />
        </div>

    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { getAndValidateToken } from "../../shared/js/common.js";
import BreadcrumbWorkoutsComponent from "../components/BreadcrumbWorkoutsComponent.vue";
import WorkoutDetailsComponent from "../components/WorkoutDetailsComponent.vue";
import AlertComponent from "../../shared/components/AlertComponent.vue";

export default {
    name: "WorkoutDetailsPage",

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
            message: "",
            messageType: ""
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", this.$route.path);

        const token = await getAndValidateToken();

        if (this.$route.path.includes("default")) {
            if (!token) {
                this.$store.commit("setLogged", false);
                this.messageType = "SECONDARY";
                this.message = "You are unlogged";
            } else {
                this.$store.commit("setLogged", true);
            }

            try {
                const res = await this.getDefaultWorkout();
                if (res.status == 200) {
                    this.workout = res.body;
                } else {
                    let messageBuilder = "";
                    for (const key in res.body) {
                        messageBuilder += `${key}: ${res.body[key]}. `;
                    }
                    this.messageType = "WARNING";
                    this.message = `An error occured (${messageBuilder}Status ${res.status})`;
                }
            } catch (error) {
                this.messageType = "WARNING";
                this.message = `An error occurred (${error})`;
            }
        }

        if (!token && this.$route.path.includes("custom")) {
            this.$router.push("/login");
        }

        if (token && this.$route.path.includes("custom")) {
            try {
                const res = await this.getCustomWorkout(token);

                if (res.status == 200) {
                    this.workout = res.body;
                } else {
                    let messageBuilder = "";
                    for (const key in res.body) {
                        messageBuilder += `${key}: ${res.body[key]}. `;
                    }
                    this.messageType = "WARNING";
                    this.message = `An error occured (${messageBuilder}Status ${res.status})`;
                }
            } catch (error) {
                this.messageType = "WARNING";
                this.message = `An error occurred (${error})`;
            }
        }
    },

    components: {
        BreadcrumbWorkoutsComponent,
        WorkoutDetailsComponent,
        AlertComponent
    },

    computed: {
        isUnlogged() {
            return this.authAlertMessage.includes("unlogged");
        }
    },

    methods: {
        async getDefaultWorkout() {
            let URL = `/api/v1/workouts/default/${this.$route.params.id}`;

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

        async getCustomWorkout(token) {
            let URL = `/api/v1/workouts/${this.$route.params.id}`;

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
}
</script>