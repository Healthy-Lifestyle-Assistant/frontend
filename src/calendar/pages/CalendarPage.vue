<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column">
        <h5>Comming soon...</h5>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
    name: "CalendarPage",

    setup() {
        useMeta({
            title: "Healthy - Calendar",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    async created() {
        this.$store.commit("setCurrentUrl", "calendar");
    }
}
</script>
