<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }} - Yay!</template>
    </metainfo>

    <p>Application description</p>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
    name: "HomeView",
    setup() {
        useMeta({
            title: "Fitness Tracker",
            htmlAttrs: {
                lang: "en"
            }
        })
    }
}
</script>
