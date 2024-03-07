<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li v-if="activeWorkouts" aria-current="page" class="breadcrumb-item mb-1 active">
                <span class="breadcrumb-custom">Workouts</span>
            </li>
            <li v-else aria-current="page" class="breadcrumb-item mb-2">
                <router-link class="breadcrumb-custom" to="/workouts-list">Workouts</router-link>
            </li>

            <li v-if="activeExercises" aria-current="page" class="breadcrumb-item mb-1 active">
                <span class="breadcrumb-custom">Exercises</span>
            </li>
            <li v-else aria-current="page" class="breadcrumb-item mb-2">
                <router-link class="breadcrumb-custom" to="/workouts-exercises-list">Exercises</router-link>
            </li>

            <li v-if="activeReminders" aria-current="page" class="breadcrumb-item mb-1 active">
                <span class="breadcrumb-custom">Reminders</span>
            </li>
            <li v-else aria-current="page" class="breadcrumb-item mb-2">
                <router-link class="breadcrumb-custom" to="/workouts-reminders-list">Reminders</router-link>
            </li>

            <li v-if="activeMedia" aria-current="page" class="breadcrumb-item mb-1 active">
                <span class="breadcrumb-custom">Media</span>
            </li>
            <li v-else aria-current="page" class="breadcrumb-item mb-1">
                <router-link class="breadcrumb-custom" to="/workouts-media-list">Media</router-link>
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
