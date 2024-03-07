import {UrlShared} from "@/shared/util/UrlShared";

export class UrlWorkout {
    static get BODY_PARTS() {
        return UrlShared.BASE + "workouts/bodyParts";
    }

    static get HTTP_REFS() {
        return UrlShared.BASE + "workouts/httpRefs";
    }

    static get HTTP_REFS_SLASH() {
        return UrlShared.BASE + "workouts/httpRefs/";
    }

    static get HTTP_REFS_DEFAULT() {
        return UrlWorkout.HTTP_REFS + "/default";
    }

    static get EXERCISES() {
        return UrlShared.BASE + "workouts/exercises";
    }

    static get EXERCISES_SLASH() {
        return UrlWorkout.EXERCISES + "/";
    }

    static get EXERCISES_DEFAULT() {
        return UrlWorkout.EXERCISES + "/default";
    }

    static get EXERCISES_DEFAULT_SLASH() {
        return UrlWorkout.EXERCISES + "/default/";
    }

    static get WORKOUTS() {
        return UrlShared.BASE + "workouts";
    }

    static get WORKOUTS_SLASH() {
        return UrlWorkout.WORKOUTS + "/";
    }

    static get WORKOUTS_DEFAULT() {
        return UrlWorkout.WORKOUTS_SLASH + "default";
    }

    static get WORKOUTS_DEFAULT_SLASH() {
        return UrlWorkout.WORKOUTS_DEFAULT + "/";
    }
}