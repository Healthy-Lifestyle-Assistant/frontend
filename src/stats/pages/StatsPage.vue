<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column">
        <h5>In development</h5>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
    name: "StatsPage",

    setup() {
        useMeta({
            title: "Stats",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    async created() {
        this.$store.commit("setCurrentUrl", "stats");
    }
}
</script>
