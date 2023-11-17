<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li v-if="isWorkouts" class="breadcrumb-item mb-3 active" aria-current="page">
                <span class="breadcrumb-custom">Workouts</span>
            </li>
            <li v-else class="breadcrumb-item mb-3" aria-current="page">
                <router-link to="/workouts" class="breadcrumb-custom">Workouts</router-link>
            </li>

            <li v-if="isExercises" class="breadcrumb-item mb-3 active" aria-current="page">
                <span class="breadcrumb-custom">Exercises</span>
            </li>
            <li v-else class="breadcrumb-item mb-3" aria-current="page">
                <router-link to="/workouts-exercises" class="breadcrumb-custom">Exercises</router-link>
            </li>

            <li v-if="isReminders" class="breadcrumb-item mb-3 active" aria-current="page">
                <span class="breadcrumb-custom">Reminders</span>
            </li>
            <li v-else class="breadcrumb-item mb-3" aria-current="page">
                <router-link to="/workouts-reminders" class="breadcrumb-custom">Reminders</router-link>
            </li>

            <li v-if="isMedia" class="breadcrumb-item mb-3 active" aria-current="page">
                <span class="breadcrumb-custom">Media</span>
            </li>
            <li v-else class="breadcrumb-item mb-3" aria-current="page">
                <router-link to="/workouts-media" class="breadcrumb-custom">Media</router-link>
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
