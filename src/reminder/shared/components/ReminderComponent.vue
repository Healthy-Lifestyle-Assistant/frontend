<template>
    <div class="card mb-3 me-3 exercise-card-width">
        <div class="card-body">
            <h5 class="card-title">{{ truncatedTitle }}</h5>

            <h6 class="card-subtitle mb-2 text-body-secondary">
                {{ isActive ? "Active" : "Deactivated" }}
                {{ isPaused ? "Paused by user" : "" }}
                {{ isPausedBilling ? "Subscription paused" : "" }}
            </h6>

            <p class="card-text">Start date {{ startDate }}</p>
            <p class="card-text">End date {{ endDate }}</p>

            <p v-if="isPaused" class="card-text">Paused at {{ pauseStartDate }} until {{ pauseEndDate }}</p>

            <div v-if="days && days.length > 0" class="card-text">
                <p>Repeat {{ reminderTypeToRegularCase(reminderType) }}</p>
                <span v-for="day in days" :key="day.id" class="body-parts-span">
                    <small class="body-parts">
                        {{ formatDateTimeWrapper(day) }}
                    </small>&nbsp;</span>
            </div>

            <div class="d-flex justify-content-end mt-3 me-4">
                <router-link :disabled="isManageButtonDisabled()" :to="generateLinkManage()"
                             class="btn btn-outline-secondary d-block me-3">Manage
                </router-link>
                <router-link :disabled="!isActive" :to="generateLinkDetails()"
                             class="btn btn-outline-secondary">Details
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {StringUtil} from "@/shared/util/StringUtil";
import {DateTimeFormatter} from "@/shared/util/DateTimeFormater";

export default {
    name: "ReminderComponent",

    props: {
        id: Number,
        workoutId: Number,
        workoutTitle: String,
        reminderType: String,
        startDate: String,
        endDate: String,
        isActive: Boolean,
        isPaused: Boolean,
        pauseStartDate: String,
        pauseEndDate: String,
        isPausedBilling: Boolean,
        createdAt: String,
        days: Array
    },

    methods: {
        generateLinkDetails() {
            return `/workouts-reminder-details/${this.id}`;
        },

        generateLinkManage() {
            return `/workouts-manage-reminder/${this.id}`;
        },

        isManageButtonDisabled() {
            if (!this.isActive || this.isPausedBilling) {
                return true;
            }
            return false;
        },

        formatDateTimeWrapper(day) {
            return DateTimeFormatter.formatDateTime(day);
        },

        reminderTypeToRegularCase(reminderTypeUpperLetters) {
            return StringUtil.upperCaseStringToRegular(reminderTypeUpperLetters);
        }
    },

    computed: {
        truncatedTitle() {
            return StringUtil.truncateStringWithWordBoundary(this.workoutTitle, 23);
        }
    }
}
</script>
