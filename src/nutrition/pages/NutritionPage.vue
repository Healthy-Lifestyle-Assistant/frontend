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
    name: "NutritionPage",

    setup() {
        useMeta({
            title: "Nutrition",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    async created() {
        this.$store.commit("setCurrentUrl", "nutrition");
    }
}
</script>
