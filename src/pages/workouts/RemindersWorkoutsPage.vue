<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <BreadcrumbWorkoutsComponent />
        <br>
        <p>In progress</p>

    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import BreadcrumbWorkoutsComponent from "../../components/workouts/BreadcrumbWorkoutsComponent.vue"

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
        BreadcrumbWorkoutsComponent
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
    }
};
</script>
