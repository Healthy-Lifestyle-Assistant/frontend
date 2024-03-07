import {UrlShared} from "@/shared/util/UrlShared";

export class UrlUser {
    static get USERS() {
        return UrlShared.BASE + "users";
    }

    static get USERS_SLASH() {
        return UrlUser.USERS + "/";
    }

    static get COUNTRIES() {
        return UrlShared.BASE + "users/countries";
    }
}