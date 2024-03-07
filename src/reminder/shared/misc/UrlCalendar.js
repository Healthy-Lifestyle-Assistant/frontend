import {UrlShared} from "@/shared/util/UrlShared";

export class UrlCalendar {
    static get WORKOUTS_REMINDERS() {
        return UrlShared.BASE + "calendar/workouts/reminders";
    }

    static get WORKOUTS_REMINDERS_SLASH() {
        return UrlCalendar.WORKOUTS_REMINDERS + "/";
    }
}