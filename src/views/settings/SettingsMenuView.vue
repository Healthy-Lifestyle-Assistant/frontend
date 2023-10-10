<template>
    <metainfo>
		<template v-slot:title="{ content }">{{ content }}</template>
	</metainfo>
    
    <div class="d-flex flex-column">
        <p>TODO: Profile -> Submit changes button</p>
        <div>
            <router-link to="/settings-menu" class="btn btn-primary" role="button">TODO: Delete Profile</router-link>
        </div>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
    name: "SettingsMenuView",

    setup() {
        useMeta({
            title: "Settings",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    async created() {
        this.$store.commit("setCurrentUrl", "settings-menu");
    }
}
</script>
