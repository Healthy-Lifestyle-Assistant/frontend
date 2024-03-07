<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">
        <div class="mb-4">
            <BreadcrumbWorkoutsComponent/>
            <AlertListComponent :alerts="alerts"/>
            <AlertComponent :message="message" :messageType="messageType"/>
            <ButtonComponent link="/workouts-create-workout" title="New Workout"/>
        </div>

        <!-- Filter -->
        <button id="filterButton" @click="onFilterToggle" class="btn btn-secondary mb-3">{{ filterButtonText }}</button>
        <form class="filter-width"
              :class="{ 'd-flex flex-column align-items-start mb-3': isFilterVisible, 'd-none': !isFilterVisible }">

            <div class="d-flex flex-row flex-wrap mb-2">
                <div v-if="$store.state.isLogged" class="form-check me-3">
                    <input type="checkbox" value="" class="form-check-input" id="filterIsCustom"
                           v-model="filterIsCustom">
                    <label for="filterIsCustom" class="form-check-label">Custom</label>
                </div>

                <div v-if="$store.state.isLogged" class="form-check me-3">
                    <input type="checkbox" value="" class="form-check-input" id="filterIsDefault"
                           v-model="filterIsDefault">
                    <label for="filterIsDefault" class="form-check-label">Default</label>
                </div>

                <div class="form-check me-3">
                    <input type="checkbox" value="" class="form-check-input" id="filterWithEquipment"
                           v-model="filterWithEquipment">
                    <label for="filterWithEquipment" class="form-check-label">With equipment</label>
                </div>

                <div class="form-check me-3">
                    <input type="checkbox" value="" class="form-check-input" id="filterWithoutEquipment"
                           v-model="filterWithoutEquipment">
                    <label for="filterWithoutEquipment" class="form-check-label">Without equipment</label>
                </div>
            </div>

            <div class="d-flex flex-row flex-wrap mb-2">
                <div class="d-flex align-items-center mb-2 me-3">
                    <input type="text" class="form-control me-1" id="filterTitle" v-model="filterTitle"
                           placeholder="Filter by title">
                    <TooltipComponent :text="getTooltipText('title')"/>
                </div>

                <div class="d-flex align-items-center mb-2 me-3">
                    <input type="text" class="form-control me-1" id="filterDescription" v-model="filterDescription"
                           placeholder="Filter by description">
                    <TooltipComponent :text="getTooltipText('description')"/>
                </div>
            </div>

            <div v-if="bodyParts && bodyParts.length > 0" class="d-flex flex-row flex-wrap mb-2">
                <div v-for="bodyPart in bodyParts" :key="bodyPart.id" class="me-2">
                    <input type="checkbox" value="" class="form-check-input" :id="bodyPart.name"
                           @click="onClickBodyPartCheckbox(bodyPart.id)"
                           :checked="filterSelectedBodyPartsCheckboxesStates[bodyPart.id]">
                    <label :for="bodyPart.name" class="form-check-label">{{ bodyPart.name }}</label>
                </div>
            </div>

            <div class="d-flex flex-row flex-wrap mb-2">
                <div class="mb-2 me-3">
                    <select id="sortField" v-model="filterSortField" class="form-select" aria-label="sortField">
                        <option :value="null" disabled>Sort by</option>
                        <option :key="1" :value="'title'">Title</option>
                        <option :key="2" :value="'description'">Description</option>
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
                <button id="clearButton" @click.prevent="onClearFilter()"
                        class="btn btn-outline-secondary mb-2 me-2">Clear
                </button>
                <button id="applyButton" @click="onPageRequest($event, 0)" class="btn btn-secondary mb-2">
                    Apply
                </button>
            </div>
        </form>

        <!-- Workouts List -->
        <AlertComponent :message="filterMessage" :messageType="filterMessageType"/>
        <br>

        <div id="totalElements" v-if="totalElements" class="text-muted mb-2">{{ this.totalElements }} found</div>

        <div v-if="workouts && workouts.length > 0" class="d-flex flex-row flex-wrap">
            <div v-for="entity in workouts" :key="entity.id">
                <WorkoutComponent :id="entity.id" :title="entity.title" :description="entity.description"
                                  :bodyParts="entity.bodyParts" :isCustom="entity.isCustom"
                                  :needsEquipment="entity.needsEquipment"
                                  :exercises="entity.exercises"/>
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
import AlertComponent from "@/shared/components/AlertComponent.vue";
import AlertListComponent from "@/shared/components/AlertListComponent.vue";
import ButtonComponent from "@/shared/components/ButtonComponent.vue";
import WorkoutComponent from "./components/WorkoutComponent.vue";
import BreadcrumbWorkoutsComponent from "./components/BreadcrumbWorkoutsComponent.vue";
import TooltipComponent from "@/shared/components/TooltipComponent.vue";
import {AlertMessageShared} from "@/shared/util/AlertMessageShared";
import {AlertMessageAuth} from "@/auth/misc/AlertMessageAuth";
import {TooltipShared} from "@/shared/util/TooltipShared";
import {UrlWorkout} from "@/activity/workout/misc/UrlWorkout";

export default {
    name: "WorkoutsListPage",

    components: {
        WorkoutComponent,
        BreadcrumbWorkoutsComponent,
        AlertComponent,
        AlertListComponent,
        ButtonComponent,
        TooltipComponent
    },

    setup() {
        useMeta({
            title: "Workouts",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            isFilterVisible: false,
            filterButtonText: "Filter",

            filterTitle: null,
            filterDescription: null,
            filterIsDefault: null,
            filterIsCustom: null,
            filterIsCustomRequestValue: null,
            filterWithEquipment: null,
            filterWithoutEquipment: null,
            filterNeedsEquipmentRequestValue: null,
            filterSortField: null,
            filterSortDirection: null,
            filterPageSize: null,
            filterSelectedBodyPartsIds: [],
            filterSelectedBodyPartsCheckboxesStates: {},

            workouts: [],
            bodyParts: [],

            totalPages: 0,
            pageNumber: 0,
            totalElements: null,

            message: null,
            messageType: null,
            filterMessage: null,
            filterMessageType: null,
            alerts: []
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-list");
        const token = await AuthUtil.getAndValidateToken(this);

        if (token) {
            this.$store.commit("setLogged", true);
        } else {
            this.$store.commit("setLogged", false);
            this.messageType = AlertMessageShared.SECONDARY;
            this.message = AlertMessageAuth.YOUR_ARE_UNLOGGED;
        }
        const defaultPageNumber = 0;
        await this.onPageRequest(null, defaultPageNumber);
    },

    methods: {
        async onPageRequest(event, pageNumber) {
            if (event === null) {
                // do nothing;
            } else {
                event.preventDefault();
            }
            this.setIsCustomRequestValue();
            this.setNeedsEquipmentRequestValue();
            this.clearAlerts();
            const urlString = this.getUrlString(pageNumber);
            const isLogged = this.$store.state.isLogged;

            let response = null;
            if (isLogged) {
                const token = AuthUtil.getToken();
                response = await this.getDefaultAndCustomWorkouts(urlString, token);
            } else {
                response = await this.getDefaultWorkouts(urlString);
            }

            if (response.status === 200) {
                if (Array.isArray(response.body["content"])
                    && response.body["content"].length === 0) {
                    this.filterMessageType = AlertMessageShared.SECONDARY;
                    this.filterMessage = AlertMessageShared.NOT_FOUND;
                    this.workouts = [];
                    this.totalPages = 0;
                    this.pageNumber = 0;
                    this.totalElements = null;
                } else {
                    this.workouts = response.body["content"];
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
            if (this.filterIsCustomRequestValue !== null) {
                urlString += `&isCustom=${this.filterIsCustomRequestValue}`;
            }
            if (this.filterNeedsEquipmentRequestValue != null) {
                urlString += `&needsEquipment=${this.filterNeedsEquipmentRequestValue}`;
            }
            if (this.filterTitle !== null && this.filterTitle.trim() !== "") {
                urlString += `&title=${this.filterTitle.trim()}`;
            }
            if (this.filterDescription !== null && this.filterDescription.trim() !== "") {
                urlString += `&description=${this.filterDescription.trim()}`;
            }
            if (this.filterSelectedBodyPartsIds && this.filterSelectedBodyPartsIds.length > 0) {
                let bodyPartsIdsString = "&bodyPartsIds=";
                for (let i = 0; i < this.filterSelectedBodyPartsIds.length; i++) {
                    bodyPartsIdsString += `${this.filterSelectedBodyPartsIds[i]},`
                }
                bodyPartsIdsString = bodyPartsIdsString.slice(0, bodyPartsIdsString.length - 1);
                urlString += bodyPartsIdsString;
            }
            if (this.filterSortField !== null) {
                urlString += `&sortField=${this.filterSortField}`;
            }
            if (this.filterSortDirection !== null) {
                urlString += `&sortDirection=${this.filterSortDirection}`;
            }
            return urlString;
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
            this.filterWithEquipment = null;
            this.filterWithoutEquipment = null;
            this.filterTitle = null;
            this.filterDescription = null;
            this.filterIsCustom = null;
            this.filterIsDefault = null;
            this.filterIsCustomRequestValue = null;
            this.filterSelectedBodyPartsIds = [];
            this.filterSelectedBodyPartsCheckboxesStates = {};
            this.filterSortField = null;
            this.filterSortDirection = null;
            this.filterPageSize = null;
            this.message = null;
            this.messageType = null;
            this.alerts = [];
        },

        onClickBodyPartCheckbox(id) {
            if (this.filterSelectedBodyPartsIds.includes(id)) {
                let index = this.filterSelectedBodyPartsIds.indexOf(id);
                this.filterSelectedBodyPartsIds.splice(index, 1);
                delete this.filterSelectedBodyPartsCheckboxesStates[id];
            } else {
                this.filterSelectedBodyPartsIds.push(id);
                this.filterSelectedBodyPartsCheckboxesStates[id] = true;
            }
        },

        setIsCustomRequestValue() {
            if (this.filterIsCustom === true
                && (this.filterIsDefault === null || this.filterIsDefault === false)) {
                this.filterIsCustomRequestValue = true;
            } else if (this.filterIsDefault === true
                && (this.filterIsCustom === null || this.filterIsCustom === false)) {
                this.filterIsCustomRequestValue = false;
            } else {
                this.filterIsCustomRequestValue = null;
            }
        },

        setNeedsEquipmentRequestValue() {
            if (this.filterWithEquipment === true
                && (this.filterWithoutEquipment === null || this.filterWithoutEquipment === false)) {
                this.filterNeedsEquipmentRequestValue = true;
            } else if (this.filterWithoutEquipment === true
                && (this.filterWithEquipment === null || this.filterWithEquipment === false)) {
                this.filterNeedsEquipmentRequestValue = false;
            } else {
                this.filterNeedsEquipmentRequestValue = null;
            }
        },

        getTooltipText(fieldName) {
            if (fieldName === "title") {
                return TooltipShared.FILTER_TITLE_TOOLTIP;
            }
            if (fieldName === "description") {
                return TooltipShared.FILTER_DESCRIPTION_TOOLTIP;
            }
        },

        async getDefaultWorkouts(urlParams) {
            let URL = UrlWorkout.WORKOUTS_DEFAULT + urlParams;
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            return {
                status: response.status,
                body: data
            };
        },

        async getDefaultAndCustomWorkouts(urlParams, token) {
            let URL = UrlWorkout.WORKOUTS + urlParams;
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
        },

        async getDefaultBodyParts() {
            const response = await fetch(UrlWorkout.BODY_PARTS, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
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
