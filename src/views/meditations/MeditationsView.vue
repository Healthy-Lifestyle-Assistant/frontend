<template>
    <metainfo>
		<template v-slot:title="{ content }">{{ content }}</template>
	</metainfo>

    <div class="d-flex flex-column">
        <p>TODO: List of default and custom meditations</p>
        <div>
            <router-link to="/meditations" class="btn btn-primary" role="button">TODO: Add Custom Meditation</router-link>
        </div>
        <br>
        <div>
            <router-link to="/meditations" class="btn btn-primary" role="button">TODO: Manage Reminders</router-link>
        </div>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
    name: "MeditationsView",

    setup() {
        useMeta({
            title: "Meditations",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/meditations");
    }
}
</script>