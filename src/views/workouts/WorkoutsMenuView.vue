<template>
    <metainfo>
		<template v-slot:title="{ content }">{{ content }}</template>
	</metainfo>
    
    <div class="d-flex">
        <router-link to="/workouts" class="btn btn-info me-4" role="button">Workouts</router-link>
        <router-link to="/workouts-exercises" class="btn btn-info me-4" role="button">Exercises</router-link>
        <router-link to="/workouts-media" class="btn btn-info me-4" role="button">Media</router-link>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
    name: "WorkoutsMenuView",

    setup() {
        useMeta({
            title: "Workouts Menu",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-menu");
    }
}
</script>
