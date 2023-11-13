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
    name: "NutritionPage",

    setup() {
        useMeta({
            title: "Healthy - Nutrition",
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
