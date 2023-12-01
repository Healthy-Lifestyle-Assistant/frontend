import { createRouter, createWebHistory } from "vue-router";
// Home
import HomePage from "../home/pages/HomePage.vue";

// Auth
import SignupPage from "../auth/pages/SignupPage.vue";
import LoginPage from "../auth/pages/LoginPage.vue";
import LogoutPage from "../auth/pages/LogoutPage.vue";

// User Settings
import SettingsPage from "../users/pages/SettingsPage.vue";

// Calendar
import CalendarPage from "../calendar/pages/CalendarPage.vue";

// Workouts
import WorkoutsPage from "../workouts/pages/WorkoutsPage.vue";
import DefaultWorkoutDetailsPage from "../workouts/pages/DefaultWorkoutDetailsPage.vue";
import CreateCustomWorkoutPage from "../workouts/pages/CreateCustomWorkoutPage.vue";

// Exercises
import ExercisesPage from "../workouts/pages/ExercisesPage.vue";
import ExerciseDetailsPage from "../workouts/pages/ExerciseDetailsPage.vue";
import CreateExercisePage from "../workouts/pages/CreateExercisePage.vue";
import ExerciseManagePage from "../workouts/pages/ExerciseManagePage.vue";

// Media
import MediaPage from "../workouts/pages/MediaPage.vue";
import RemindersWorkoutsPage from "../workouts/pages/RemindersWorkoutsPage.vue";
import CreateMediaPage from "../workouts/pages/CreateMediaPage.vue";
import ManageMediaPage from "../workouts/pages/ManageMediaPage.vue";

// Nutrition
import NutritionPage from "../nutrition/pages/NutritionPage.vue";

// Meditations
import MeditationsPage from "../meditations/pages/MeditationsPage.vue";


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

    // Calendar
    {
        path: "/calendar",
        name: "CalendarPage",
        component: CalendarPage
    },

    // Workouts
    {
        path: "/workouts-list",
        name: "WorkoutsPage",
        component: WorkoutsPage
    },
    {
        path: "/workouts-details/default/:id",
        name: "DefaultWorkoutDetailsPage",
        component: DefaultWorkoutDetailsPage
    },
    // Exercises
    {
        path: "/workouts-exercises-list",
        name: "ExercisesPage",
        component: ExercisesPage
    },
    {
        path: "/workouts-exercise-details/:type/:id",
        name: "ExerciseDetailsPage",
        component: ExerciseDetailsPage
    },
    {
        path: "/workouts-create-exercise",
        name: "CreateExercisePage",
        component: CreateExercisePage
    },
    {
        path: "/workouts-manage-exercise/:id",
        name: "ExerciseManagePage",
        component: ExerciseManagePage
    },
    // Media
    {
        path: "/workouts-media-list",
        name: "MediaPage",
        component: MediaPage
    },
    {
        path: "/workouts-create-media",
        name: "CreateMediaPage",
        component: CreateMediaPage
    },
    {
        path: "/workouts-manage-media/:id",
        name: "ManageMediaPage",
        component: ManageMediaPage
    },
    {
        path: "/workouts-create-workout",
        name: "CreateCustomWorkoutPage",
        component: CreateCustomWorkoutPage
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
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
