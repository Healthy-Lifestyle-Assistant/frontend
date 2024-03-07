import {createRouter, createWebHistory} from "vue-router";
// Home
import HomePage from "@/home/HomePage.vue";

// Auth
import LoginPage from "@/auth/LoginPage.vue";
import LogoutPage from "@/auth/LogoutPage.vue";

// User
import UserSignupPage from "@/user/UserSignupPage.vue";
import UserManagePage from "@/user/UserManagePage.vue";

// Workout
import WorkoutsListPage from "@/activity/workout/WorkoutsListPage.vue";
import WorkoutDetailsPage from "@/activity/workout/WorkoutDetailsPage.vue";
import WorkoutCreatePage from "@/activity/workout/WorkoutCreatePage.vue";
import WorkoutManagePage from "@/activity/workout/WorkoutManagePage.vue";
import WorkoutSetupReminderPage from "@/reminder/workout/WorkoutSetupReminderPage.vue";
import WorkoutListRemindersPage from "@/reminder/workout/WorkoutListRemindersPage.vue";

// Exercise
import ExercisesListPage from "@/activity/workout/ExercisesListPage.vue";
import ExerciseDetailsPage from "@/activity/workout/ExerciseDetailsPage.vue";
import ExerciseCreatePage from "@/activity/workout/ExerciseCreatePage.vue";
import ExerciseManagePage from "@/activity/workout/ExerciseManagePage.vue";

// Media
import MediasListPage from "@/activity/workout/MediasListPage.vue";
import MediaCreatePage from "@/activity/workout/MediaCreatePage.vue";
import MediaManagePage from "@/activity/workout/MediaManagePage.vue";

// Nutrition
import NutritionPage from "@/activity/nutrition/NutritionPage.vue";

// Meditation
import MentalActivityPage from "@/activity/mental/MentalActivityPage.vue";

// Calendar
import CalendarTodayPage from "@/calendar/CalendarTodayPage.vue";
import CalendarWeekPage from "@/calendar/CalendarWeekPage.vue";
import CalendarMonthPage from "@/calendar/CalendarMonthPage.vue";
import CalendarSelectPeriodPage from "@/calendar/CalendarSelectPeriodPage.vue";

// Stats
import StatsTodayPage from "@/stats/StatsTodayPage.vue";
import StatsWeekPage from "@/stats/StatsWeekPage.vue";
import StatsMonthPage from "@/stats/StatsMonthPage.vue";
import StatsSelectPeriodPage from "@/stats/StatsSelectPeriodPage.vue";

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
        component: UserSignupPage
    },
    {
        path: "/settings",
        name: "SettingsPage",
        component: UserManagePage
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
    {
        path: "/workouts-setup-reminder/:workoutId",
        name: "WorkoutSetupReminderPage",
        component: WorkoutSetupReminderPage
    },
    {
        path: "/workouts-reminders-list",
        name: "WorkoutRemindersListPage",
        component: WorkoutListRemindersPage
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

    // Nutrition
    {
        path: "/nutrition",
        name: "NutritionPage",
        component: NutritionPage
    },

    // Meditation
    {
        path: "/meditations",
        name: "MeditationsPage",
        component: MentalActivityPage
    },

    // Calendar
    {
        path: "/calendar-today",
        name: "CalendarTodayPage",
        component: CalendarTodayPage
    },
    {
        path: "/calendar-week",
        name: "CalendarWeekPage",
        component: CalendarWeekPage
    },
    {
        path: "/calendar-month",
        name: "CalendarMonthPage",
        component: CalendarMonthPage
    },
    {
        path: "/calendar-select-period",
        name: "CalendarSelectPeriodPage",
        component: CalendarSelectPeriodPage
    },

    // Stats
    {
        path: "/stats-today",
        name: "StatsTodayPage",
        component: StatsTodayPage
    },
    {
        path: "/stats-week",
        name: "StatsWeekPage",
        component: StatsWeekPage
    },
    {
        path: "/stats-month",
        name: "StatsMonthPage",
        component: StatsMonthPage
    },
    {
        path: "/stats-select-period",
        name: "StatsSelectPeriodPage",
        component: StatsSelectPeriodPage
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
