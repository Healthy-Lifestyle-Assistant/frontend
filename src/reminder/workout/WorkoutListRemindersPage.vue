<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">
        <div class="mb-4">
            <BreadcrumbWorkoutsComponent/>
            <AlertListComponent :alerts="alerts"/>
            <AlertComponent :message="message" :messageType="messageType"/>
        </div>

        <!-- Filter -->
        <button id="filterButton" @click="onFilterToggle" class="btn btn-secondary mb-3">{{ filterButtonText }}</button>
        <form class="filter-width"
              :class="{ 'd-flex flex-column align-items-start mb-3': isFilterVisible, 'd-none': !isFilterVisible }">

            <div class="d-flex flex-row flex-wrap mb-2">
                <div v-if="$store.state.isLogged" class="form-check me-3">
                    <input type="checkbox" value="" class="form-check-input" id="filterIsActive"
                           v-model="filterIsActive">
                    <label for="filterIsActive" class="form-check-label">Active</label>
                </div>

                <div v-if="$store.state.isLogged" class="form-check me-3">
                    <input type="checkbox" value="" class="form-check-input" id="filterIsPaused"
                           v-model="filterIsPaused">
                    <label for="filterIsPaused" class="form-check-label">Paused</label>
                </div>

                <div v-if="$store.state.isLogged" class="form-check me-3">
                    <input type="checkbox" value="" class="form-check-input" id="filterIsDeactivated"
                           v-model="filterIsDeactivated">
                    <label for="filterIsDeactivated" class="form-check-label">Deactivated</label>
                </div>
            </div>

            <div class="d-flex flex-row flex-wrap mb-2">
                <div class="mb-2 me-3">
                    <select id="sortField" v-model="filterSortField" class="form-select" aria-label="sortField">
                        <option :value="null" disabled>Sort by</option>
                        <option :key="1" :value="'createdAt'">Creation date</option>
                        <option :key="2" :value="'startDate'">Start date</option>
                    </select>
                </div>

                <div class="mb-2 me-3">
                    <select id="sortDirection" v-model="filterSortDirection" class="form-select"
                            aria-label="sortDirection">
                        <option :value="null" disabled>Direction</option>
                        <option :key="1" :value="'asc'">Ascending</option>
                        <option :key="2" :value="'desc'">Descending</option>
                    </select>
                </div>

                <div class="mb-2 me-3">
                    <select id="pageSize" v-model="filterPageSize" class="form-select" aria-label="pageSize">
                        <option :value="null" disabled>Page size</option>
                        <option :key="1" :value="5">5</option>
                        <option :key="2" :value="10">10</option>
                        <option :key="3" :value="15">15</option>
                    </select>
                </div>
            </div>

            <div>
                <button id="clearButton" @click.prevent="onClearFilter"
                        class="btn btn-outline-secondary mb-2 me-2">Clear
                </button>
                <button id="applyButton" @click="onPageRequest($event, 0)"
                        class="btn btn-secondary mb-2">Apply
                </button>
            </div>
        </form>

        <!-- Reminders List -->
        <AlertComponent :message="filterMessage" :messageType="filterMessageType"/>
        <br>

        <div id="totalElements" v-if="totalElements" class="text-muted mb-2">{{ this.totalElements }} found</div>

        <div v-if="reminders && reminders.length > 0" class="d-flex flex-row flex-wrap">
            <div v-for="reminder in reminders" :key="reminder.id">
                <ReminderComponent :id="reminder.id" :workoutId="reminder.workoutId"
                                   :workoutTitle="reminder.workoutTitle"
                                   :reminderType="reminder.reminderType" :startDate="reminder.startDate"
                                   :endDate="reminder.endDate"
                                   :isActive="reminder.isActive" :isPaused="reminder.isPaused"
                                   :pauseStartDate="reminder.pauseStartDate"
                                   :pauseEndDate="reminder.pauseEndDate" :isPausedBilling="reminder.isPausedBilling"
                                   :createdAt="reminder.createdAt" :days="reminder.days"/>
            </div>
        </div>
    </div>

    <div class="d-flex flex-column align-items-center">
        <nav aria-label="pagination">
            <ul class="pagination">
                <li v-for="page in totalPages" :key="page"
                    :class="{ 'page-item': true, 'active': pageNumber === (page - 1) }"
                    :aria-current="{ 'page': pageNumber === (page - 1) }">
                    <span v-if="pageNumber === (page - 1)" class="page-link">{{ page }}</span>
                    <a v-else class="page-link" href="" @click="onPageRequest($event, page - 1)">{{ page }}</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import {useMeta} from "vue-meta";
import {ExceptionUtil} from "@/shared/util/ExceptionUtil";
import {AuthUtil} from "@/auth/misc/AuthUtil";
import {AlertMessageShared} from "@/shared/util/AlertMessageShared";
import {UrlCalendar} from "@/reminder/shared/misc/UrlCalendar";
import AlertComponent from "@/shared/components/AlertComponent.vue";
import AlertListComponent from "@/shared/components/AlertListComponent.vue";
import ReminderComponent from "@/reminder/shared/components/ReminderComponent.vue";
import BreadcrumbWorkoutsComponent from "@/activity/workout/components/BreadcrumbWorkoutsComponent.vue";

export default {
    name: "WorkoutListRemindersPage",

    components: {
        ReminderComponent,
        BreadcrumbWorkoutsComponent,
        AlertComponent,
        AlertListComponent
    },

    setup() {
        useMeta({
            title: "Workout Reminders",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            isFilterVisible: false,
            filterButtonText: "Filter",

            filterIsActive: null,
            filterIsPaused: null,
            filterIsDeactivated: null,
            filterSortField: null,
            filterSortDirection: null,
            filterPageSize: null,
            filterStatusRequestValue: null,

            reminders: [],

            totalPages: 0,
            totalElements: null,
            pageNumber: 0,

            message: null,
            messageType: null,
            filterMessage: null,
            filterMessageType: null,
            alerts: []
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-reminders-list");
        const token = await AuthUtil.getAndValidateToken(this);

        if (!token) {
            AuthUtil.redirectToLoginSessionExpired(this);
        } else {
            this.$store.commit("setLogged", true);
            const defaultPageNumber = 0;
            await this.onPageRequest(null, defaultPageNumber);
        }
    },

    methods: {
        async onPageRequest(event, pageNumber) {
            if (event === null) {
                // do nothing;
            } else {
                event.preventDefault();
            }
            this.setFilterStatusRequestValue();
            this.clearAlerts();
            const urlString = this.getUrlString(pageNumber);

            const token = AuthUtil.getToken();
            let response = await this.getWorkoutReminders(urlString, token);

            if (response.status === 200) {
                if (Array.isArray(response.body["content"])
                    && response.body["content"].length === 0) {
                    this.filterMessageType = AlertMessageShared.SECONDARY;
                    this.filterMessage = AlertMessageShared.NOT_FOUND;
                    this.reminders = [];
                    this.totalPages = 0;
                    this.pageNumber = 0;
                    this.totalElements = null;
                } else {
                    this.reminders = response.body["content"];
                    this.totalPages = response.body["totalPages"];
                    this.pageNumber = response.body["number"];
                    this.totalElements = response.body["totalElements"];
                }
            } else if (response.status === 401) {
                AuthUtil.on401(this);
            } else {
                this.alerts = ExceptionUtil.buildAlertsList(response.body, AlertMessageShared.WARNING);
            }
        },

        getUrlString(pageNumber) {
            let urlString = `?pageNumber=${pageNumber}`;
            if (this.filterPageSize !== null) {
                urlString += `&pageSize=${this.filterPageSize}`;
            }
            if (this.filterStatusRequestValue !== null) {
                urlString += `&isActive=${this.filterStatusRequestValue}`;
            }
            if (this.filterSortField !== null) {
                urlString += `&sortField=${this.filterSortField}`;
            }
            if (this.filterSortDirection !== null) {
                urlString += `&sortDirection=${this.filterSortDirection}`;
            }
            return urlString;
        },

        setFilterStatusRequestValue() {
            if ((this.filterIsActive === null || this.filterIsActive === false)
                && (this.filterIsDeactivated === null || this.filterIsDeactivated === false)) {
                this.filterStatusRequestValue = null;
                return;
            }
            if (this.filterIsActive === true && this.filterIsDeactivated === true) {
                this.filterStatusRequestValue = true;
                return;
            }
            if ((this.filterIsActive === false || this.filterIsActive === null)
                && this.filterIsDeactivated === true) {
                this.filterStatusRequestValue = false;
                return;
            }
        },

        clearAlerts() {
            this.message = null;
            this.messageType = null;
            this.filterMessage = null;
            this.filterMessageType = null;
            this.alerts = [];
        },

        onFilterToggle() {
            this.isFilterVisible = !this.isFilterVisible;
            this.filterButtonText = this.isFilterVisible ? "Hide Filter" : "Filter";
        },

        onClearFilter() {
            this.filterIsActive = null;
            this.filterIsPaused = null;
            this.filterIsDeactivated = null;
            this.filterSortField = null;
            this.filterSortDirection = null;
            this.filterPageSize = null;
            this.filterStatusRequestValue = null;
            this.alerts = [];
        },

        async getWorkoutReminders(urlParams, token) {
            let URL = UrlCalendar.WORKOUTS_REMINDERS + urlParams;
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            return {
                status: response.status,
                body: data
            };
        }
    }
}
</script>