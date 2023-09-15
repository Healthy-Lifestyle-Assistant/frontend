import { createRouter, createWebHistory } from "vue-router";
// Home
import HomeView from "../views/home/HomeView";

// Auth
import SignupView from "../views/auth/SignupView";
import LoginView from "../views/auth/LoginView";
import LogoutView from "../views/auth/LogoutView";

// Calendar
import CalendarMenuView from "../views/calendar/CalendarMenuView";
import RemindersView from "../views/calendar/RemindersView";

// Workouts
import WorkoutsMenuView from "../views/workouts/WorkoutsMenuView";
import ExercisesView from "../views/workouts/ExercisesView";
import WorkoutsView from "../views/workouts/WorkoutsView";
import ExercisesMediaView from "../views/workouts/ExercisesMediaView";

// Nutrition
import NutritionMenuView from "../views/nutrition/NutritionMenuView";
import RecipesView from "../views/nutrition/RecipesView";
import SupplementsView from "../views/nutrition/SupplementsView";
import NutritionMediaView from "../views/nutrition/NutritionMediaView";

// Meditations
import MeditationsMenuView from "../views/meditations/MeditationsMenuView";
import MeditationsView from "../views/meditations/MeditationsView";
import MeditationsMediaView from "../views/meditations/MeditationsMediaView";

// Settings
import SettingsMenuView from "../views/settings/SettingsMenuView";


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

    // Calendar
    {
        path: "/calendar-menu",
        name: "CalendarMenuView",
        component: CalendarMenuView
    },
    {
        path: "/calendar-reminders",
        name: "RemindersView",
        component: RemindersView
    },

    // Workouts
    {
        path: "/workouts-menu",
        name: "WorkoutsMenuView",
        component: WorkoutsMenuView
    },
    {
        path: "/workouts-exercises",
        name: "ExercisesView",
        component: ExercisesView
    },
    {
        path: "/workouts",
        name: "WorkoutsView",
        component: WorkoutsView
    },
    {
        path: "/workouts-media",
        name: "ExercisesMediaView",
        component: ExercisesMediaView
    },

    // Nutrition
    {
        path: "/nutrition-menu",
        name: "NutritionMenuView",
        component: NutritionMenuView
    },
    {
        path: "/nutrition-recipes",
        name: "RecipesView",
        component: RecipesView
    },
    {
        path: "/nutrition-supplements",
        name: "SupplementsView",
        component: SupplementsView
    },
    {
        path: "/nutrition-media",
        name: "NutritionMediaView",
        component: NutritionMediaView
    },

    // Meditations
    {
        path: "/meditations-menu",
        name: "MeditationsMenuView",
        component: MeditationsMenuView
    },
    {
        path: "/meditations",
        name: "MeditationsView",
        component: MeditationsView
    },
    {
        path: "/meditations-media",
        name: "MeditationsMediaView",
        component: MeditationsMediaView
    },

    // Settings
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
