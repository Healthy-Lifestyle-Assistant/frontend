<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column">
        <p>TODO: List of default and custom meditations media references</p>
        <div>
            <router-link to="/meditations-media" class="btn btn-primary" role="button">TODO: Add Custom Media
                Reference</router-link>
        </div>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
    name: "MeditationsMediaView",

    setup() {
        useMeta({
            title: "Meditations Media",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/meditations-media");
    }
}
</script>