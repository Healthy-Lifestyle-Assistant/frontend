import { createRouter, createWebHistory } from "vue-router";
// Home
import HomePage from "../home/pages/HomePage.vue";

// Auth
import SignupPage from "../auth/pages/SignupPage.vue";
import LoginPage from "../auth/pages/LoginPage.vue";
import LogoutPage from "../auth/pages/LogoutPage.vue";

// User Settings
import SettingsPage from "../users/pages/SettingsPage.vue";

// Workouts
import WorkoutsListPage from "../workouts/pages/WorkoutsListPage.vue";
import WorkoutDefaultDetailsPage from "../workouts/pages/WorkoutDefaultDetailsPage.vue";
import WorkoutCreateCustomPage from "../workouts/pages/WorkoutCreateCustomPage.vue";

// Exercises
import ExercisesListPage from "../workouts/pages/ExercisesListPage.vue";
import ExerciseDetailsPage from "../workouts/pages/ExerciseDetailsPage.vue";
import ExerciseCreatePage from "../workouts/pages/ExerciseCreatePage.vue";
import ExerciseManagePage from "../workouts/pages/ExerciseManagePage.vue";

// Media
import MediasListPage from "../workouts/pages/MediasListPage.vue";
import MediaCreatePage from "../workouts/pages/MediaCreatePage.vue";
import MediaManagePage from "../workouts/pages/MediaManagePage.vue";

// Reminders
import RemindersWorkoutsPage from "../workouts/pages/RemindersWorkoutsPage.vue";

// Nutrition
import NutritionPage from "../nutrition/pages/NutritionPage.vue";

// Meditations
import MeditationsPage from "../meditations/pages/MeditationsPage.vue";

// Calendar
import CalendarPage from "../calendar/pages/CalendarPage.vue";

// Calendar
import StatsPage from "../stats/pages/StatsPage.vue";


const routes = [
    // Home
    {
        path: "/",
        name: "HomePage",
        component: HomePage
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

    // User Settings
    {
        path: "/settings",
        name: "SettingsPage",
        component: SettingsPage
    },

    // Workouts
    {
        path: "/workouts-list",
        name: "WorkoutsListPage",
        component: WorkoutsListPage
    },
    {
        path: "/workouts-details/:type/:id",
        name: "WorkoutDefaultDetailsPage",
        component: WorkoutDefaultDetailsPage
    },
    {
        path: "/workouts-create-workout",
        name: "WorkoutCreateCustomPage",
        component: WorkoutCreateCustomPage
    },

    // Exercises
    {
        path: "/workouts-exercises-list",
        name: "ExercisesListPage",
        component: ExercisesListPage
    },
    {
        path: "/workouts-exercise-details/:type/:id",
        name: "ExerciseDetailsPage",
        component: ExerciseDetailsPage
    },
    {
        path: "/workouts-create-exercise",
        name: "ExerciseCreatePage",
        component: ExerciseCreatePage
    },
    {
        path: "/workouts-manage-exercise/:id",
        name: "ExerciseManagePage",
        component: ExerciseManagePage
    },

    // Media
    {
        path: "/workouts-media-list",
        name: "MediasListPage",
        component: MediasListPage
    },
    {
        path: "/workouts-create-media",
        name: "MediaCreatePage",
        component: MediaCreatePage
    },
    {
        path: "/workouts-manage-media/:id",
        name: "MediaManagePage",
        component: MediaManagePage
    },

    // Reminders
    {
        path: "/workouts-reminders-list",
        name: "RemindersWorkoutsPage",
        component: RemindersWorkoutsPage
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

    // Calendar
    {
        path: "/calendar",
        name: "CalendarPage",
        component: CalendarPage
    },

    // Stats
    {
        path: "/stats",
        name: "StatsPage",
        component: StatsPage
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
