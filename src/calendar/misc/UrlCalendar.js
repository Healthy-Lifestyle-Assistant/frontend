import {UrlShared} from "@/shared/util/UrlShared";

export class UrlCalendar {
    static get CALENDAR_ACTIVITY_TODAY() {
        return UrlShared.BASE + "calendar/activity/today";
    }

    static get CALENDAR_ACTIVITY_WEEK() {
        return UrlShared.BASE + "calendar/activity/week";
    }

    static get CALENDAR_ACTIVITY_MONTH() {
        return UrlShared.BASE + "calendar/activity/month";
    }
}