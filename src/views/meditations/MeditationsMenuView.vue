<template>
    <metainfo>
		<template v-slot:title="{ content }">{{ content }}</template>
	</metainfo>
    
    <div class="d-flex">
        <router-link to="/meditations" class="btn btn-info me-4" role="button">Meditations</router-link>
        <router-link to="/meditations-media" class="btn btn-info" role="button">Media</router-link>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
    name: "MeditationsMenuView",

    setup() {
        useMeta({
            title: "Meditations Menu",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    async created() {
        this.$store.commit("setCurrentUrl", "meditations-menu");
    }
}
</script>
