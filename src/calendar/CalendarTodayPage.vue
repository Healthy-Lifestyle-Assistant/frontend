<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column">
        <div>
            <AlertListComponent :alerts="alerts"/>
            <AlertComponent :message="message" :messageType="messageType"/>
            <BreadcrumbCalendarComponent/>

            <h4 class="mb-4 text-muted">Today Activity {{ dayDate !== null ? dayDate : "" }}</h4>

            <p>
                Filter: Workout, Nutrition, Mental Activity
            </p>

            <div v-if="activities && activities.length > 0">
                <div v-for="(activity, index) in activities" :key="index">
                    <ActivityRowComponent
                        :activityId="activity.activityId"
                        :activityType="activity.activityType"
                        :isSingle="activity.isSingle"
                        :isPausedBilling="activity.isPausedBilling"
                        :isCompleted="activity.isCompleted"
                        :title="activity.title"
                        :date="activity.date"
                        :hours="activity.hours"
                        :minutes="activity.minutes"
                    />
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import {useMeta} from "vue-meta";
import {AuthUtil} from "@/auth/misc/AuthUtil";
import {UrlCalendar} from "@/calendar/misc/UrlCalendar";
import {AlertMessageShared} from "@/shared/util/AlertMessageShared";
import {ExceptionUtil} from "@/shared/util/ExceptionUtil";
import AlertListComponent from "@/shared/components/AlertListComponent.vue";
import AlertComponent from "@/shared/components/AlertComponent.vue";
import BreadcrumbCalendarComponent from "@/calendar/components/BreadcrumbCalendarComponent.vue";
import ActivityRowComponent from "@/calendar/components/ActivityRowComponent.vue";

export default {
    name: "CalendarTodayPage",
    components: {AlertComponent, AlertListComponent, BreadcrumbCalendarComponent, ActivityRowComponent},

    setup() {
        useMeta({
            title: "Calendar Today",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            dayDate: null,
            activities: [],

            messageType: null,
            message: null,
            alerts: []
        }
    },

    async created() {
        this.$store.commit("setCurrentUrl", "calendar-today");
        const token = await AuthUtil.getAndValidateToken(this);

        if (token) {
            this.$store.commit("setLogged", true);

            let response = await this.getTodayActivity(token);
            console.log(response);

            if (response.status === 200) {
                this.dayDate = response.body["dayDate"];
                this.activities = response.body["activities"];
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
        async getTodayActivity(token) {
            let URL = UrlCalendar.CALENDAR_ACTIVITY_TODAY;
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
