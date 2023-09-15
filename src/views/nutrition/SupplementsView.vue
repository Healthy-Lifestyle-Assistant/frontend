<template>
    <metainfo>
		<template v-slot:title="{ content }">{{ content }}</template>
	</metainfo>
    
    <div class="d-flex flex-column">
        <p>TODO: List of default and custom supplements</p>
        <div>
            <router-link to="/nutrition-supplements" class="btn btn-info" role="button">TODO: Add Custom Supplement</router-link>
        </div>
        <br>
        <div>
            <router-link to="/nutrition-supplements" class="btn btn-info" role="button">TODO: Manage Reminders</router-link>
        </div>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
    name: "SupplementsView",

    setup() {
        useMeta({
            title: "Supplements",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/nutrition-supplements");
    }
}
</script>