<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">
        <div>
            <BreadcrumbWorkoutsComponent/>
            <AlertListComponent :alerts="alerts"/>
            <AlertComponent :message="message" :messageType="messageType"/>
        </div>

        <div v-if="exercise" class="w-100">
            <ExerciseDetailsComponent :id="exercise.id" :title="exercise.title" :description="exercise.description"
                                      :bodyParts="exercise.bodyParts" :isCustom="exercise.isCustom"
                                      :needsEquipment="exercise.needsEquipment"
                                      :httpRefs="exercise.httpRefs"/>
        </div>

    </div>
</template>

<script>
import {useMeta} from "vue-meta";
import {AuthUtil} from "@/auth/misc/AuthUtil";
import {ExceptionUtil} from "@/shared/util/ExceptionUtil";
import {UrlWorkout} from "@/activity/workout/misc/UrlWorkout";
import {AlertMessageAuth} from "@/auth/misc/AlertMessageAuth";
import {AlertMessageShared} from "@/shared/util/AlertMessageShared";
import AlertComponent from "@/shared/components/AlertComponent.vue";
import AlertListComponent from "@/shared/components/AlertListComponent.vue";
import BreadcrumbWorkoutsComponent from "./components/BreadcrumbWorkoutsComponent.vue";
import ExerciseDetailsComponent from "./components/ExerciseDetailsComponent.vue";

export default {
    name: "ExerciseDetailsPage",

    components: {
        BreadcrumbWorkoutsComponent,
        ExerciseDetailsComponent,
        AlertComponent,
        AlertListComponent
    },

    setup() {
        useMeta({
            title: "Exercise Details",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            exercise: null,

            message: null,
            messageType: null,
            alerts: []
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", this.$route.path);
        const token = await AuthUtil.getAndValidateToken(this);

        if (this.$route.path.includes("default")) {
            if (!token) {
                this.$store.commit("setLogged", false);
                this.messageType = AlertMessageShared.SECONDARY;
                this.message = AlertMessageAuth.YOUR_ARE_UNLOGGED;
            } else {
                this.$store.commit("setLogged", true);
            }

            const response = await this.getDefaultExercise();
            if (response.status === 200) {
                this.exercise = response.body;
            } else {
                this.alerts = ExceptionUtil.buildAlertsList(response.body, AlertMessageShared.WARNING);
            }
        }

        if (!token && this.$route.path.includes("custom")) {
            await this.$router.push("/login");
        }

        if (token && this.$route.path.includes("custom")) {
            const response = await this.getCustomExercise(token);
            if (response.status === 200) {
                this.exercise = response.body;
            } else if (response.status === 401) {
                AuthUtil.on401(this);
            } else {
                this.alerts = ExceptionUtil.buildAlertsList(response.body, AlertMessageShared.WARNING);
            }
        }
    },

    methods: {
        async getDefaultExercise() {
            let URL = UrlWorkout.EXERCISES_DEFAULT_SLASH + this.$route.params.id;
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

        async getCustomExercise(token) {
            let URL = UrlWorkout.EXERCISES + this.$route.params.id;
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