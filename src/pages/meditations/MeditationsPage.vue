<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex">
        <p>Comming soon...</p>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
    name: "MeditationsPage",

    setup() {
        useMeta({
            title: "Healthy - Meditations",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    async created() {
        this.$store.commit("setCurrentUrl", "meditations");
    }
}
</script>
