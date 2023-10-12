import { createRouter, createWebHistory } from "vue-router";
// Home
import HomeView from "../pages/home/HomeView";

// Auth
import SignupPage from "../pages/auth/SignupPage";
import LoginPage from "../pages/auth/LoginPage";
import LogoutPage from "../pages/auth/LogoutPage";

// Calendar
import CalendarPage from "../pages/calendar/CalendarPage";

// Workouts
import WorkoutsPage from "../pages/workouts/WorkoutsPage";
import ExercisesPage from "../pages/workouts/ExercisesPage";

// Nutrition
import NutritionPage from "../pages/nutrition/NutritionPage";

// Meditations
import MeditationsPage from "../pages/meditations/MeditationsPage";

// Settings
import SettingsPage from "../pages/settings/SettingsPage";


const routes = [
    // Home
    {
        path: "/",
        name: "HomeView",
        component: HomeView
    },

    // Auth
    {
        path: "/signup",
        name: "SignupPage",
        component: SignupPage
    },
    {
        path: "/login",
        name: "LoginPage",
        component: LoginPage
    },
    {
        path: "/logout",
        name: "LogoutPage",
        component: LogoutPage
    },

    // Calendar
    {
        path: "/calendar",
        name: "CalendarPage",
        component: CalendarPage
    },

    // Workouts
    {
        path: "/workouts",
        name: "WorkoutsPage",
        component: WorkoutsPage
    },
    {
        path: "/workouts-exercises",
        name: "ExercisesPage",
        component: ExercisesPage
    },

    // Nutrition
    {
        path: "/nutrition",
        name: "NutritionPage",
        component: NutritionPage
    },

    // Meditations
    {
        path: "/meditations",
        name: "MeditationsPage",
        component: MeditationsPage
    },

    // Settings
    {
        path: "/settings",
        name: "SettingsPage",
        component: SettingsPage
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
