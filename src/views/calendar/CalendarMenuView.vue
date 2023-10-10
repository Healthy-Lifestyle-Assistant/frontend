<template>
    <metainfo>
		<template v-slot:title="{ content }">{{ content }}</template>
	</metainfo>
    
    <div class="d-flex flex-column">
        <p>TODO: Dropdown (today, week, month, past three months) -> Show activities button</p>
        <p>TODO: Date picker Select custom date range -> Show activities button</p>
        <br>
        <div>
            <router-link to="/calendar-reminders" class="btn btn-primary" role="button">TODO: Reminders</router-link>
        </div>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
    name: "CalendarMenuView",

    setup() {
        useMeta({
            title: "Calendar",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    async created() {
        this.$store.commit("setCurrentUrl", "calendar-menu");
    }
}
</script>
