<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column">
        <p>Commin soon...</p>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
    name: "SettingsPage",

    setup() {
        useMeta({
            title: "Settings",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    async created() {
        this.$store.commit("setCurrentUrl", "settings");
    }
}
</script>
