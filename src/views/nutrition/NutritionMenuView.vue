<template>
    <metainfo>
		<template v-slot:title="{ content }">{{ content }}</template>
	</metainfo>
    
    <div class="d-flex">
        <router-link to="/nutrition-recipes" class="btn btn-primary me-4" role="button">Recipes</router-link>
        <router-link to="/nutrition-supplements" class="btn btn-primary me-4" role="button">Supplements</router-link>
        <router-link to="/nutrition-media" class="btn btn-primary" role="button">Media</router-link>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
    name: "NutritionMenuView",

    setup() {
        useMeta({
            title: "Nutrition",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    async created() {
        this.$store.commit("setCurrentUrl", "nutrition-menu");
    }
}
</script>
