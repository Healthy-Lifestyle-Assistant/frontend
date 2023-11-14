<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li v-if="isWorkouts" class="breadcrumb-item active" aria-current="page">
                Workouts
            </li>
            <li v-else class="breadcrumb-item" aria-current="page">
                <router-link to="/workouts">Workouts</router-link>
            </li>

            <li v-if="isExercises" class="breadcrumb-item active" aria-current="page">
                Exercises
            </li>
            <li v-else class="breadcrumb-item" aria-current="page">
                <router-link to="/workouts-exercises">Exercises</router-link>
            </li>

            <li v-if="isReminders" class="breadcrumb-item active" aria-current="page">
                Reminders
            </li>
            <li v-else class="breadcrumb-item" aria-current="page">
                <router-link to="/workouts-reminders">Reminders</router-link>
            </li>

            <li v-if="isMedia" class="breadcrumb-item active" aria-current="page">
                Media
            </li>
            <li v-else class="breadcrumb-item" aria-current="page">
                <router-link to="/workouts-media">Media</router-link>
            </li>
        </ol>
    </nav>
</template>

<script>
export default {
    name: "BreadcrumbWorkoutsComponent",

    computed: {
        isWorkouts() {
            return this.$store.state.currentUrl.includes("workouts") &&
                !this.$store.state.currentUrl.includes("details") &&
                !this.$store.state.currentUrl.includes("exercises") &&
                !this.$store.state.currentUrl.includes("exercise") &&
                !this.$store.state.currentUrl.includes("reminders") &&
                !this.$store.state.currentUrl.includes("media");
        },

        isExercises() {
            return this.$store.state.currentUrl.includes("exercises");
        },

        isReminders() {
            return this.$store.state.currentUrl.includes("reminders");
        },

        isMedia() {
            return this.$store.state.currentUrl.includes("media");
        }
    }
}
</script>
