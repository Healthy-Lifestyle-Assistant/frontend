<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">
        <BreadcrumbWorkoutsComponent />
        <AlertComponent :message="message" :messageType="messageType" /> <br>

        <div v-if="exercise" class="w-100">
            <ExerciseDetailsComponent :id="exercise.id" :title="exercise.title" :description="exercise.description"
                :bodyParts="exercise.bodyParts" :isCustom="exercise.isCustom" :needsEquipment="exercise.needsEquipment"
                :httpRefs="exercise.httpRefs" />
        </div>

    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { getAndValidateToken } from "../../shared/js/auth.js";
import { EXERCISES_DEFAULT_SLASH, EXERCISES_SLASH } from "../../shared/URL";
import { SECONDARY, YOUR_ARE_UNLOGGED, WARNING } from "../../shared/MESSAGE.js";
import BreadcrumbWorkoutsComponent from "../components/BreadcrumbWorkoutsComponent.vue";
import ExerciseDetailsComponent from "../components/ExerciseDetailsComponent.vue";
import AlertComponent from "../../shared/components/AlertComponent.vue";

export default {
    name: "ExerciseDetailsPage",

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
                this.messageType = SECONDARY;
                this.message = YOUR_ARE_UNLOGGED;
            } else {
                this.$store.commit("setLogged", true);
            }

            try {
                const res = await this.getDefaultExercise();
                if (res.status == 200) {
                    this.exercise = res.body;
                } else {
                    let messageBuilder = "";
                    for (const key in res.body) {
                        messageBuilder += `${key}: ${res.body[key]}. `;
                    }
                    this.messageType = WARNING;
                    this.message = messageBuilder;
                }
            } catch (error) {
                this.messageType = WARNING;
                this.message = `Error: ${error}`;
            }
        }

        if (!token && this.$route.path.includes("custom")) {
            this.$router.push("/login");
        }

        if (token && this.$route.path.includes("custom")) {
            try {
                const res = await this.getCustomExercise(token);

                if (res.status == 200) {
                    this.exercise = res.body;
                } else {
                    let messageBuilder = "";
                    for (const key in res.body) {
                        messageBuilder += `${key}: ${res.body[key]}. `;
                    }
                    this.messageType = WARNING;
                    this.message = messageBuilder;
                }
            } catch (error) {
                this.messageType = WARNING;
                this.message = `Error: ${error}`;
            }
        }
    },

    components: {
        BreadcrumbWorkoutsComponent,
        ExerciseDetailsComponent,
        AlertComponent
    },

    methods: {
        async getDefaultExercise() {
            let URL = EXERCISES_DEFAULT_SLASH + this.$route.params.id;
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
            let URL = EXERCISES_SLASH + this.$route.params.id;
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