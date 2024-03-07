<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li v-if="activeToday" aria-current="page" class="breadcrumb-item mb-1 active">
                <span class="breadcrumb-custom">Today</span>
            </li>
            <li v-else aria-current="page" class="breadcrumb-item mb-2">
                <router-link class="breadcrumb-custom" to="/calendar-today">Today</router-link>
            </li>

            <li v-if="activeWeek" aria-current="page" class="breadcrumb-item mb-1 active">
                <span class="breadcrumb-custom">Week</span>
            </li>
            <li v-else aria-current="page" class="breadcrumb-item mb-2">
                <router-link class="breadcrumb-custom" to="/calendar-week">Week</router-link>
            </li>

            <li v-if="activeMonth" aria-current="page" class="breadcrumb-item mb-1 active">
                <span class="breadcrumb-custom">Month</span>
            </li>
            <li v-else aria-current="page" class="breadcrumb-item mb-2">
                <router-link class="breadcrumb-custom" to="/calendar-month">Month</router-link>
            </li>

            <li v-if="activeSelectPeriod" aria-current="page" class="breadcrumb-item mb-1 active">
                <span class="breadcrumb-custom">Select Period</span>
            </li>
            <li v-else aria-current="page" class="breadcrumb-item mb-1">
                <router-link class="breadcrumb-custom" to="/calendar-select-period">Select Period</router-link>
            </li>
        </ol>
    </nav>
</template>

<script>
export default {
    name: "BreadcrumbWorkoutsComponent",

    computed: {
        activeToday() {
            return this.$store.state.currentUrl.includes("calendar-today");
        },

        activeWeek() {
            return this.$store.state.currentUrl.includes("calendar-week");
        },

        activeMonth() {
            return this.$store.state.currentUrl.includes("calendar-month");
        },

        activeSelectPeriod() {
            return this.$store.state.currentUrl.includes("calendar-select-period");
        }
    }
}
</script>
