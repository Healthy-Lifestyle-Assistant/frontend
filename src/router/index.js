import { createRouter, createWebHistory } from "vue-router";
// home
import HomeView from "../views/home/HomeView";
import HelloView from "../views/home/HelloView";
// auth
import SignupView from "../views/auth/SignupView";
import LoginView from "../views/auth/LoginView";
import LogoutView from "../views/auth/LogoutView";
// calendar
import CalendarMenuView from "../views/calendar/CalendarMenuView";
// workouts
import ExercisesMenuView from "../views/workouts/ExercisesMenuView";
import MediaMenuView from "../views/workouts/MediaMenuView";
import GetExercisesView from "../views/workouts/GetExercisesView";
import WorkoutsMenuView from "../views/workouts/WorkoutsMenuView";
// supplements
import SupplementsMenuView from "../views/supplements/SupplementsMenuView";
// settings
import SettingsMenuView from "../views/settings/SettingsMenuView";


const routes = [
    // home
    {
        path: "/",
        name: "HomeView",
        component: HomeView
    },
    {
        path: "/hello",
        name: "HelloView",
        component: HelloView
    },
    // auth
    {
        path: "/signup",
        name: "SignupView",
        component: SignupView
    },
    {
        path: "/login",
        name: "LoginView",
        component: LoginView
    },
    {
        path: "/logout",
        name: "LogoutView",
        component: LogoutView
    },
    // calendar
    {
        path: "/calendar-menu",
        name: "CalendarMenuView",
        component: CalendarMenuView
    },
    // workouts
    {
        path: "/exercises-menu",
        name: "ExercisesMenuView",
        component: ExercisesMenuView
    },
    {
        path: "/exercises",
        name: "GetExercisesView",
        component: GetExercisesView
    },
    {
        path: "/media-menu",
        name: "MediaMenuView",
        component: MediaMenuView
    },
    {
        path: "/workouts-menu",
        name: "WorkoutsMenuView",
        component: WorkoutsMenuView
    },
    // supplements
    {
        path: "/supplements-menu",
        name: "SupplementsMenuView",
        component: SupplementsMenuView
    },
    // settings
    {
        path: "/settings-menu",
        name: "SettingsMenuView",
        component: SettingsMenuView
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
