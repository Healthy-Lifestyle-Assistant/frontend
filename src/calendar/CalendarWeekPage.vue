<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column">
        <div>
            <AlertListComponent :alerts="alerts"/>
            <AlertComponent :message="message" :messageType="messageType"/>
            <BreadcrumbCalendarComponent/>

            <h4 class="mb-4 text-muted">Week Activity
                {{ (weekStartDate !== null && weekEndDate !== null) ? weekStartDate + " - " + weekEndDate : "" }}</h4>

            <p>
                Filter: Workout, Nutrition, Mental Activity
            </p>

            <div v-if="monday">
                <ActivityDayComponent :dayDate="monday.dayDate" :dayOfWeek="monday.dayOfWeek"
                                      :activities="monday.activities"/>
            </div>

            <div v-if="tuesday">
                <ActivityDayComponent :dayDate="tuesday.dayDate" :dayOfWeek="tuesday.dayOfWeek"
                                      :activities="tuesday.activities"/>
            </div>

            <div v-if="wednesday">
                <ActivityDayComponent :dayDate="wednesday.dayDate" :dayOfWeek="wednesday.dayOfWeek"
                                      :activities="wednesday.activities"/>
            </div>

            <div v-if="thursday">
                <ActivityDayComponent :dayDate="thursday.dayDate" :dayOfWeek="thursday.dayOfWeek"
                                      :activities="thursday.activities"/>
            </div>

            <div v-if="friday">
                <ActivityDayComponent :dayDate="friday.dayDate" :dayOfWeek="friday.dayOfWeek"
                                      :activities="friday.activities"/>
            </div>

            <div v-if="saturday">
                <ActivityDayComponent :dayDate="saturday.dayDate" :dayOfWeek="saturday.dayOfWeek"
                                      :activities="saturday.activities"/>
            </div>

            <div v-if="sunday">
                <ActivityDayComponent :dayDate="sunday.dayDate" :dayOfWeek="sunday.dayOfWeek"
                                      :activities="sunday.activities"/>
            </div>
        </div>
    </div>
</template>

<script>
import {useMeta} from "vue-meta";
import {AuthUtil} from "@/auth/misc/AuthUtil";
import {UrlCalendar} from "@/calendar/misc/UrlCalendar";
import {ExceptionUtil} from "@/shared/util/ExceptionUtil";
import {AlertMessageShared} from "@/shared/util/AlertMessageShared";
import AlertListComponent from "@/shared/components/AlertListComponent.vue";
import AlertComponent from "@/shared/components/AlertComponent.vue";
import BreadcrumbCalendarComponent from "@/calendar/components/BreadcrumbCalendarComponent.vue";
import ActivityDayComponent from "@/calendar/components/ActivityDayComponent.vue";

export default {
    name: "CalendarWeekPage",
    components: {AlertComponent, AlertListComponent, BreadcrumbCalendarComponent, ActivityDayComponent},

    setup() {
        useMeta({
            title: "Calendar Week",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            weekStartDate: null,
            weekEndDate: null,
            monday: null,
            tuesday: null,
            wednesday: null,
            thursday: null,
            friday: null,
            saturday: null,
            sunday: null,

            messageType: null,
            message: null,
            alerts: []
        }
    },

    async created() {
        this.$store.commit("setCurrentUrl", "calendar-week");
        const token = await AuthUtil.getAndValidateToken(this);

        if (token) {
            this.$store.commit("setLogged", true);

            let response = await this.getWeekActivity(token);
            console.log(response);

            if (response.status === 200) {
                this.dayDate = response.body["dayDate"];
                this.weekStartDate = response.body["weekStartDate"];
                this.weekEndDate = response.body["weekEndDate"];
                this.monday = response.body["monday"];
                this.tuesday = response.body["tuesday"];
                this.wednesday = response.body["wednesday"];
                this.thursday = response.body["thursday"];
                this.friday = response.body["friday"];
                this.saturday = response.body["saturday"];
                this.sunday = response.body["sunday"];
            } else if (response.status === 401) {
                AuthUtil.on401(this);
            } else {
                this.alerts = ExceptionUtil.buildAlertsList(response.body, AlertMessageShared.WARNING);
            }

        } else {
            AuthUtil.redirectToLoginFromCalendar(this);
        }
    },

    methods: {
        async getWeekActivity(token) {
            let URL = UrlCalendar.CALENDAR_ACTIVITY_WEEK;
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            return {
                status: response.status,
                body: data
            };
        }
    }
}
</script>
