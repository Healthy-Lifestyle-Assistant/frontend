<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex">
        <h5>In development</h5>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
    name: "MeditationsPage",

    setup() {
        useMeta({
            title: "Meditations",
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
