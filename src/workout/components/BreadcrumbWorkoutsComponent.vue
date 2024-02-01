<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li v-if="activeWorkouts" class="breadcrumb-item mb-1 active" aria-current="page">
                <span class="breadcrumb-custom">Workouts</span>
            </li>
            <li v-else class="breadcrumb-item mb-2" aria-current="page">
                <router-link to="/workouts-list" class="breadcrumb-custom">Workouts</router-link>
            </li>

            <li v-if="activeExercises" class="breadcrumb-item mb-1 active" aria-current="page">
                <span class="breadcrumb-custom">Exercises</span>
            </li>
            <li v-else class="breadcrumb-item mb-2" aria-current="page">
                <router-link to="/workouts-exercises-list" class="breadcrumb-custom">Exercises</router-link>
            </li>

            <li v-if="activeReminders" class="breadcrumb-item mb-1 active" aria-current="page">
                <span class="breadcrumb-custom">Reminders</span>
            </li>
            <li v-else class="breadcrumb-item mb-2" aria-current="page">
                <router-link to="/workouts-reminders-list" class="breadcrumb-custom">Reminders</router-link>
            </li>

            <li v-if="activeMedia" class="breadcrumb-item mb-1 active" aria-current="page">
                <span class="breadcrumb-custom">Media</span>
            </li>
            <li v-else class="breadcrumb-item mb-1" aria-current="page">
                <router-link to="/workouts-media-list" class="breadcrumb-custom">Media</router-link>
            </li>
        </ol>
    </nav>
</template>

<script>
export default {
    name: "BreadcrumbWorkoutsComponent",

    computed: {
        activeWorkouts() {
            return this.$store.state.currentUrl.includes("workouts-list");
        },

        activeExercises() {
            return this.$store.state.currentUrl.includes("workouts-exercises-list");
        },

        activeReminders() {
            return this.$store.state.currentUrl.includes("workouts-reminders-list");
        },

        activeMedia() {
            return this.$store.state.currentUrl.includes("workouts-media-list");
        }
    }
}
</script>
