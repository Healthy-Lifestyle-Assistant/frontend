<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li v-if="activeToday" aria-current="page" class="breadcrumb-item mb-1 active">
                <span class="breadcrumb-custom">Today</span>
            </li>
            <li v-else aria-current="page" class="breadcrumb-item mb-2">
                <router-link class="breadcrumb-custom" to="/stats-today">Today</router-link>
            </li>

            <li v-if="activeWeek" aria-current="page" class="breadcrumb-item mb-1 active">
                <span class="breadcrumb-custom">Week</span>
            </li>
            <li v-else aria-current="page" class="breadcrumb-item mb-2">
                <router-link class="breadcrumb-custom" to="/stats-week">Week</router-link>
            </li>

            <li v-if="activeMonth" aria-current="page" class="breadcrumb-item mb-1 active">
                <span class="breadcrumb-custom">Month</span>
            </li>
            <li v-else aria-current="page" class="breadcrumb-item mb-2">
                <router-link class="breadcrumb-custom" to="/stats-month">Month</router-link>
            </li>

            <li v-if="activeSelectPeriod" aria-current="page" class="breadcrumb-item mb-1 active">
                <span class="breadcrumb-custom">Select Period</span>
            </li>
            <li v-else aria-current="page" class="breadcrumb-item mb-1">
                <router-link class="breadcrumb-custom" to="/stats-select-period">Select Period</router-link>
            </li>
        </ol>
    </nav>
</template>

<script>
export default {
    name: "BreadcrumbWorkoutsComponent",

    computed: {
        activeToday() {
            return this.$store.state.currentUrl.includes("stats-today");
        },

        activeWeek() {
            return this.$store.state.currentUrl.includes("stats-week");
        },

        activeMonth() {
            return this.$store.state.currentUrl.includes("stats-month");
        },

        activeSelectPeriod() {
            return this.$store.state.currentUrl.includes("stats-select-period");
        }
    }
}
</script>
