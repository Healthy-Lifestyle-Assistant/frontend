<template>
    <metainfo>
		<template v-slot:title="{ content }">{{ content }}</template>
	</metainfo>
    
    <div class="d-flex flex-column">
        <p>TODO: List of default and custom media references</p>
        <div>
            <router-link to="/nutrition-media" class="btn btn-primary" role="button">TODO: Add Custom Media Reference</router-link>
        </div>
        <br>
        <div>
            <router-link to="/nutrition-media" class="btn btn-primary" role="button">TODO: Manage Reminders</router-link>
        </div>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
    name: "NutritionMediaView",

    setup() {
        useMeta({
            title: "Nutrition Media",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/nutrition-media");
    }
}
</script>