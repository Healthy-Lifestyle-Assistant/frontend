<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li v-if="activeMentals" aria-current="page" class="breadcrumb-item mb-1 active">
                <span class="breadcrumb-custom">Mentals</span>
            </li>
            <li v-else aria-current="page" class="breadcrumb-item mb-2">
                <router-link class="breadcrumb-custom" to="/mentals-list">Mentals</router-link>
            </li>

           <!-- <li v-if="activeExercises" aria-current="page" class="breadcrumb-item mb-1 active">
                <span class="breadcrumb-custom">Exercises</span>
            </li>
            <li v-else aria-current="page" class="breadcrumb-item mb-2">
                <router-link class="breadcrumb-custom" to="/workouts-exercises-list">Exercises</router-link>
            </li>-->

            <li v-if="activeReminders" aria-current="page" class="breadcrumb-item mb-1 active">
                <span class="breadcrumb-custom">Reminders</span>
            </li>
            <li v-else aria-current="page" class="breadcrumb-item mb-2">
                <router-link class="breadcrumb-custom" to="/mentals-reminders-list">Reminders</router-link>
            </li>

            <li v-if="activeMedia" aria-current="page" class="breadcrumb-item mb-1 active">
                <span class="breadcrumb-custom">Media</span>
            </li>
            <li v-else aria-current="page" class="breadcrumb-item mb-1">
                <router-link class="breadcrumb-custom" to="/mentals-media-list">Media</router-link>
            </li>
        </ol>
    </nav>
</template>

<script>
export default {
    name: "BreadcrumbMentalsComponent",

    computed: {
        activeMentals() {
            return this.$store.state.currentUrl.includes("mentals-list");
        },

        //activeExercises() {
           // return this.$store.state.currentUrl.includes("workouts-exercises-list");
       // },-->

        activeReminders() {
            return this.$store.state.currentUrl.includes("mentals-reminders-list");
        },

        activeMedia() {
            return this.$store.state.currentUrl.includes("mentals-media-list");
        }
    }
}
</script>