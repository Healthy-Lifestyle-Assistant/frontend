<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div>
            <BreadcrumbWorkoutsComponent />
            <AlertComponent :message="message" :messageType="messageType" /><br>
        </div>

        <h5>In development</h5>

    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { getAndValidateToken } from "../../shared/js/auth.js";
import { SECONDARY, YOUR_ARE_UNLOGGED } from "../../shared/MESSAGE.js";
import BreadcrumbWorkoutsComponent from "../components/BreadcrumbWorkoutsComponent.vue"
import AlertComponent from "../../shared/components/AlertComponent.vue";

export default {
    name: "RemindersWorkoutsPage",

    setup() {
        useMeta({
            title: "Reminders",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            message: "",
            messageType: ""
        };
    },

    components: {
        BreadcrumbWorkoutsComponent,
        AlertComponent
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-reminders-list");
        const token = await getAndValidateToken();
        if (!token) {
            this.$store.commit("setLogged", false);
            this.messageType = SECONDARY;
            this.message = YOUR_ARE_UNLOGGED;
        } else {
            this.$store.commit("setLogged", true);
        }
    }
};
</script>
