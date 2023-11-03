<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <AlertComponent :isUnlogged="isUnlogged" :isError="isError" :message="message" />

        <BreadcrumbWorkoutsComponent />
        <br>
        <p>In progress</p>

    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import BreadcrumbWorkoutsComponent from "../../components/workouts/BreadcrumbWorkoutsComponent.vue"
import { getAndValidateToken } from "../common/common.js";
import AlertComponent from "../../components/common/AlertComponent.vue";

export default {
    name: "RemindersWorkoutsPage",

    setup() {
        useMeta({
            title: "Healthy - Reminders",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            message: ""
        };
    },

    components: {
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

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-reminders");

        const token = await getAndValidateToken();

        if (!token) {
            this.$store.commit("setLogged", false);
            this.message = "You are unlogged";
        } else {
            this.$store.commit("setLogged", true);
        }
    }
};
</script>
