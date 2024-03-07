<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column">
        <div>
            <AlertListComponent :alerts="alerts"/>
            <AlertComponent :message="message" :messageType="messageType"/>
            <BreadcrumbCalendarComponent/>

            <h4 class="mb-4 text-muted">Month Activity</h4>

            <p>
                Filter: Workout, Nutrition, Mental Activity
            </p>

            <p>
                Week 1
                <br>
                List of activities by week day and time
            </p>

            <p>
                Week 2
                <br>
                List of activities by week day and time
            </p>

            <p>
                Week 3
                <br>
                List of activities by week day and time
            </p>

            <p>
                Week 4
                <br>
                List of activities by week day and time
            </p>
        </div>
    </div>
</template>

<script>
import {useMeta} from "vue-meta";
import {AuthUtil} from "@/auth/misc/AuthUtil";
import AlertListComponent from "@/shared/components/AlertListComponent.vue";
import AlertComponent from "@/shared/components/AlertComponent.vue";
import BreadcrumbCalendarComponent from "@/calendar/components/BreadcrumbCalendarComponent.vue";

export default {
    name: "CalendarMonthPage",
    components: {AlertComponent, AlertListComponent, BreadcrumbCalendarComponent},

    setup() {
        useMeta({
            title: "Calendar Month",
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
        this.$store.commit("setCurrentUrl", "calendar-month");
        const token = await AuthUtil.getAndValidateToken(this);

        if (token) {
            this.$store.commit("setLogged", true);
        } else {
            AuthUtil.redirectToLoginFromCalendar(this);
        }
    }
}
</script>
