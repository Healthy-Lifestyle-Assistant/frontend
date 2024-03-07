import {UrlShared} from "@/shared/util/UrlShared";

export class UrlAuth {
    static get LOGIN() {
        return UrlShared.BASE + "users/auth/login";
    }

    static get VALIDATE() {
        return UrlShared.BASE + "users/auth/validate";
    }
}