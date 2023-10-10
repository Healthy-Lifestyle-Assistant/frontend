<template>
    <metainfo>
		<template v-slot:title="{ content }">{{ content }}</template>
	</metainfo>
    
    <div class="d-flex flex-column">
        <p>TODO: List of default and custom recipes</p>
        <div>
            <router-link to="/nutrition-recipes" class="btn btn-primary" role="button">TODO: Add Custom Recipe</router-link>
        </div>
        <br>
        <div>
            <router-link to="/nutrition-recipes" class="btn btn-primary" role="button">TODO: Manage Reminders</router-link>
        </div>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
    name: "RecipesView",

    setup() {
        useMeta({
            title: "Recipes",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/nutrition-recipes");
    }
}
</script>