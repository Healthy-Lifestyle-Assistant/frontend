<template>
    <metainfo>
		<template v-slot:title="{ content }">{{ content }}</template>
	</metainfo>
    
    <div>
        <p>TODO: List of reminders</p>
        <router-link to="/calendar-reminders" class="btn btn-primary" role="button">TODO: Create Reminder</router-link>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
    name: "RemindersView",

    setup() {
        useMeta({
            title: "Reminders",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    async created() {
        this.$store.commit("setCurrentUrl", "calendar-reminders");
    }
}
</script>