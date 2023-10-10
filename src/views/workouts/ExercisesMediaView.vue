<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column">
        <p>TODO: List of default and custom exercises</p>
        <div>
            <router-link to="/workouts" class="btn btn-primary" role="button">TODO: Add Custom Media Reference</router-link>
        </div>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
    name: "ExercisesMediaView",

    setup() {
        useMeta({
            title: "Exercises Media",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-media");
    }
}
</script>
