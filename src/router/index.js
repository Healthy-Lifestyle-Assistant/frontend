import { createRouter, createWebHistory } from "vue-router";
// Home
import HomePage from "../home/pages/HomePage.vue";

// Auth
import LoginPage from "../auth/pages/LoginPage.vue";
import LogoutPage from "../auth/pages/LogoutPage.vue";

// User
import SignupPage from "../user/pages/SignupPage.vue";
import SettingsPage from "../user/pages/SettingsPage.vue";

// Workout
import WorkoutsListPage from "../workout/pages/WorkoutsListPage.vue";
import WorkoutDetailsPage from "../workout/pages/WorkoutDetailsPage.vue";
import WorkoutCreatePage from "../workout/pages/WorkoutCreatePage.vue";
import WorkoutManagePage from "../workout/pages/WorkoutManagePage.vue";

// Exercise
import ExercisesListPage from "../workout/pages/ExercisesListPage.vue";
import ExerciseDetailsPage from "../workout/pages/ExerciseDetailsPage.vue";
import ExerciseCreatePage from "../workout/pages/ExerciseCreatePage.vue";
import ExerciseManagePage from "../workout/pages/ExerciseManagePage.vue";

// Media
import MediasListPage from "../workout/pages/MediasListPage.vue";
import MediaCreatePage from "../workout/pages/MediaCreatePage.vue";
import MediaManagePage from "../workout/pages/MediaManagePage.vue";

// Reminder
import RemindersWorkoutsPage from "../workout/pages/RemindersWorkoutsPage.vue";

// Nutrition
import NutritionPage from "../nutrition/pages/NutritionPage.vue";

// Mental
import MentalsListPage from "../mental/pages/MentalsListPage.vue";

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
        path: "/login",
        name: "LoginPage",
        component: LoginPage
    },
    {
        path: "/logout",
        name: "LogoutPage",
        component: LogoutPage
    },

    // User
    {
        path: "/signup",
        name: "SignupPage",
        component: SignupPage
    },
    {
        path: "/settings",
        name: "SettingsPage",
        component: SettingsPage
    },

    // Workout
    {
        path: "/workouts-list",
        name: "WorkoutsListPage",
        component: WorkoutsListPage
    },
    {
        path: "/workouts-details/:type/:id",
        name: "WorkoutDetailsPage",
        component: WorkoutDetailsPage
    },
    {
        path: "/workouts-create-workout",
        name: "WorkoutCreatePage",
        component: WorkoutCreatePage
    },
    {
        path: "/workouts-manage-workout/:id",
        name: "WorkoutManagePage",
        component: WorkoutManagePage
    },

    // Exercise
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

    // Reminder
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

    // Mental
    {
        path: "/mental-list",
        name: "MentalsListPage",
        component: MentalsListPage
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
