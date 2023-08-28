import { createRouter, createWebHistory } from "vue-router";
import AboutView from "../views/AboutView";
import HelloView from "../views/HelloView";
import SignupView from "../views/SignupView";
import LoginView from "../views/LoginView";
import GetExercisesView from "../views/GetExercisesView";
import WorkoutsMenuView from "../views/WorkoutsMenuView";

const routes = [
    {
        path: "/about",
        name: "AboutView",
        component: AboutView
    },
    {
        path: "/hello",
        name: "HelloView",
        component: HelloView
    },
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
        path: "/exercises",
        name: "GetExercisesView",
        component: GetExercisesView
    },
    {
        path: "/workouts",
        name: "WorkoutsMenuView",
        component: WorkoutsMenuView
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
