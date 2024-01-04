<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div>
            <BreadcrumbWorkoutsComponent />
            <AlertComponent :message="message" :messageType="messageType" /><br>
            <ButtonComponent link="/workouts-create-workout" title="New Workout" />
            <br><br>
        </div>

        <!-- Custom Workouts -->
        <h6 v-if="customWorkouts" class="text-secondary mt-3 mb-4">Custom Workouts</h6>

        <div v-if="customWorkouts" class="d-flex flex-column w-100">

            <div v-for="workout  in  customWorkouts" :key="workout.id">
                <WorkoutComponent :id="workout.id" :title="workout.title" :description="workout.description"
                    :bodyParts="workout.bodyParts" :isCustom="workout.isCustom" :needsEquipment="workout.needsEquipment"
                    :exercises="workout.exercises" />
            </div>

        </div>

        <!-- Default Workouts -->
        <h6 v-if="defaultWorkouts" class="text-secondary mt-3 mb-4">Default Workouts</h6>

        <div v-if="defaultWorkouts" class="d-flex flex-column w-100">

            <div v-for=" workout  in  defaultWorkouts " :key="workout.id">
                <WorkoutComponent :id="workout.id" :title="workout.title" :description="workout.description"
                    :bodyParts="workout.bodyParts" :isCustom="workout.isCustom" :needsEquipment="workout.needsEquipment"
                    :exercises="workout.exercises" />
            </div>

        </div>

    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { getAndValidateToken } from "../../shared/js/common.js";
import WorkoutComponent from "../components/WorkoutComponent.vue";
import BreadcrumbWorkoutsComponent from "../components/BreadcrumbWorkoutsComponent.vue";
import AlertComponent from "../../shared/components/AlertComponent.vue";
import ButtonComponent from "../../shared/components/ButtonComponent.vue";

export default {
    name: "WorkoutsListPage",

    setup() {
        useMeta({
            title: "Workouts",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            defaultWorkouts: null,
            customWorkouts: null,
            message: "",
            messageType: ""
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-list");

        const token = await getAndValidateToken();

        try {
            const res = await this.getDefaultWorkouts();

            if (res.status === 200) {
                this.defaultWorkouts = res.body;
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

            // Retrieve Custom Workouts

            // try {
            //     const res = await this.getCustomWorkouts(token);

            //     if (res.status === 200) {
            //         this.customWorkouts = res.body;
            // if (Array.isArray(res.body) && res.body.length === 0) {
            //             this.messageType = "SECONDARY";
            //             this.message = "No Custom Workouts Found";
            //         }
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
        AlertComponent,
        ButtonComponent
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
