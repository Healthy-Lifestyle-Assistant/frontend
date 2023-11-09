import { createRouter, createWebHistory } from "vue-router";
// Home
import HomePage from "../pages/home/HomePage";

// Auth
import SignupPage from "../pages/auth/SignupPage";
import LoginPage from "../pages/auth/LoginPage";
import LogoutPage from "../pages/auth/LogoutPage";

// Calendar
import CalendarPage from "../pages/calendar/CalendarPage";

// Workouts
import WorkoutsPage from "../pages/workouts/WorkoutsPage";
import ExercisesPage from "../pages/workouts/ExercisesPage";
import DefaultExerciseDetailsPage from "../pages/workouts/DefaultExerciseDetailsPage";
import MediaPage from "../pages/workouts/MediaPage";
import CreateExercisePage from "../pages/workouts/CreateExercisePage";
import RemindersWorkoutsPage from "../pages/workouts/RemindersWorkoutsPage";
import CreateMediaPage from "../pages/workouts/CreateMediaPage";

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
    {
        path: "/workouts-exercise-details/default/:id",
        name: "DefaultExerciseDetailsPage",
        component: DefaultExerciseDetailsPage
    },
    {
        path: "/workouts-media",
        name: "MediaPage",
        component: MediaPage
    },
    {
        path: "/workouts-create-exercise",
        name: "CreateExercisePage",
        component: CreateExercisePage
    },
    {
        path: "/workouts-reminders",
        name: "RemindersWorkoutsPage",
        component: RemindersWorkoutsPage
    },
    {
        path: "/workouts-create-media",
        name: "CreatemediaPage",
        component: CreateMediaPage
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
