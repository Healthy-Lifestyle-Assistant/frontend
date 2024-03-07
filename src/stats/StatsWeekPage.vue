<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column">
        <div>
            <AlertListComponent :alerts="alerts"/>
            <AlertComponent :message="message" :messageType="messageType"/>
            <BreadcrumbStatsComponent/>
        </div>

        <h4 class="mb-4 text-muted">Week Stats</h4>

        <p>
            Workout - X %
            <br>
            Nutrition - Y %
            <br>
            Mental Activity - Z %
        </p>
    </div>
</template>

<script>
import {useMeta} from "vue-meta";
import {AuthUtil} from "@/auth/misc/AuthUtil";
import AlertListComponent from "@/shared/components/AlertListComponent.vue";
import AlertComponent from "@/shared/components/AlertComponent.vue";
import BreadcrumbStatsComponent from "@/stats/components/BreadcrumbStatsComponent.vue";

export default {
    name: "StatsWeekPage",
    components: {AlertComponent, AlertListComponent, BreadcrumbStatsComponent},

    setup() {
        useMeta({
            title: "Stats Week",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            messageType: null,
            message: null,
            alerts: []
        }
    },

    async created() {
        this.$store.commit("setCurrentUrl", "stats-week");
        const token = await AuthUtil.getAndValidateToken(this);

        if (token) {
            this.$store.commit("setLogged", true);
        } else {
            AuthUtil.redirectToLoginFromStats(this);
        }
    }
}
</script>
