<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">
        <div class="mb-4">
            <BreadcrumbWorkoutsComponent/>
            <AlertListComponent :alerts="alerts"/>
            <AlertComponent :message="message" :messageType="messageType"/>
            <ButtonComponent link="/workouts-create-media" title="New Media"/>
        </div>

        <!-- Filter -->
        <button id="filterButton" @click="onFilterToggle" class="btn btn-secondary mb-3">{{ filterButtonText }}</button>
        <form class="filter-width"
              :class="{ 'd-flex flex-column align-items-start mb-3': isFilterVisible, 'd-none': !isFilterVisible }">

            <div class="d-flex flex-row flex-wrap mb-2">
                <div v-if="$store.state.isLogged" class="form-check me-3">
                    <input type="checkbox" value="" class="form-check-input" id="isCustom" v-model="filterIsCustom">
                    <label for="isCustom" class="form-check-label">Custom</label>
                </div>

                <div v-if="$store.state.isLogged" class="form-check me-3">
                    <input type="checkbox" value="" class="form-check-input" id="isDefault" v-model="filterIsDefault">
                    <label for="isDefault" class="form-check-label">Default</label>
                </div>
            </div>

            <div class="d-flex flex-row flex-wrap mb-2">
                <div class="d-flex align-items-center mb-2 me-3">
                    <input type="text" class="form-control me-1" id="filterName" v-model="filterName"
                           placeholder="Filter by name">
                    <TooltipComponent :text="getTooltipText('title')"/>
                </div>

                <div class="d-flex align-items-center mb-2 me-3">
                    <input type="text" class="form-control me-1" id="filterDescription" v-model="filterDescription"
                           placeholder="Filter by description">
                    <TooltipComponent :text="getTooltipText('description')"/>
                </div>
            </div>

            <div class="d-flex flex-row flex-wrap mb-2">
                <div class="mb-2 me-3">
                    <select id="sortField" v-model="filterSortField" class="form-select" aria-label="sortField">
                        <option :value="null" disabled>Sort by</option>
                        <option :key="1" :value="'name'">Name</option>
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
                <button id="clearButton" @click="onClearFilter($event)"
                        class="btn btn-outline-secondary mb-2 me-2">Clear
                </button>
                <button id="applyButton" @click="onPageRequest($event, 0)"
                        class="btn btn-secondary mb-2">Apply
                </button>
            </div>
        </form>

        <!-- HttpRef List -->
        <AlertComponent :message="filterMessage" :messageType="filterMessageType"/>
        <br>

        <div id="totalElements" v-if="totalElements" class="text-muted mb-2">{{ this.totalElements }} found</div>

        <div v-if="httpRefs && httpRefs.length > 0" class="d-flex flex-row flex-wrap">
            <div v-for="entity in httpRefs" :key="entity.id">
                <MediaComponent :id="entity.id" :name="entity.name" :description="entity.description"
                                :isCustom="entity.isCustom" :httpRef="entity.ref"/>
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
import {AuthUtil} from "@/auth/misc/AuthUtil";
import {ExceptionUtil} from "@/shared/util/ExceptionUtil";
import {AlertMessageShared} from "@/shared/util/AlertMessageShared";
import {AlertMessageAuth} from "@/auth/misc/AlertMessageAuth";
import ButtonComponent from "@/shared/components/ButtonComponent.vue";
import AlertComponent from "@/shared/components/AlertComponent.vue";
import AlertListComponent from "@/shared/components/AlertListComponent.vue";
import MediaComponent from "./components/MediaComponent.vue";
import BreadcrumbWorkoutsComponent from "./components/BreadcrumbWorkoutsComponent.vue";
import TooltipComponent from "@/shared/components/TooltipComponent.vue";
import {TooltipShared} from "@/shared/util/TooltipShared";
import {UrlWorkout} from "@/activity/workout/misc/UrlWorkout";

export default {
    name: "MediasListPage",

    components: {
        MediaComponent,
        BreadcrumbWorkoutsComponent,
        AlertComponent,
        AlertListComponent,
        ButtonComponent,
        TooltipComponent
    },

    setup() {
        useMeta({
            title: "Media",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            isFilterVisible: false,
            filterButtonText: "Filter",

            filterName: null,
            filterDescription: null,
            filterIsDefault: null,
            filterIsCustom: null,
            filterSortField: null,
            filterSortDirection: null,
            filterPageSize: null,
            filterIsCustomRequestValue: null,

            httpRefs: [],
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
        this.$store.commit("setCurrentUrl", "/workouts-media-list");
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
            this.clearAlerts();
            const urlString = this.getUrlString(pageNumber);
            const isLogged = this.$store.state.isLogged;

            let response = null;
            if (isLogged) {
                const token = AuthUtil.getToken();
                response = await this.getDefaultAndCustomHttpRefs(urlString, token);
            } else {
                response = await this.getDefaultHttpRefs(urlString);
            }

            if (response.status === 200) {
                if (Array.isArray(response.body["content"]) && response.body["content"].length === 0) {
                    this.filterMessageType = AlertMessageShared.SECONDARY;
                    this.filterMessage = AlertMessageShared.NOT_FOUND;
                    this.httpRefs = [];
                    this.totalPages = 0;
                    this.pageNumber = 0;
                    this.totalElements = null;
                } else {
                    this.httpRefs = response.body["content"];
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
            if (this.filterName !== null && this.filterName.trim() !== "") {
                urlString += `&name=${this.filterName.trim()}`;
            }
            if (this.filterDescription !== null && this.filterDescription.trim() !== "") {
                urlString += `&description=${this.filterDescription.trim()}`;
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

        onClearFilter(event) {
            event.preventDefault();
            this.filterName = null;
            this.filterDescription = null;
            this.filterIsCustom = null;
            this.filterIsDefault = null;
            this.filterIsCustomRequestValue = null;
            this.filterSortField = null;
            this.filterSortDirection = null;
            this.filterPageSize = null;
            this.message = null;
            this.messageType = null;
            this.alerts = [];
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

        getTooltipText(fieldName) {
            if (fieldName === "title") {
                return TooltipShared.FILTER_TITLE_TOOLTIP;
            }
            if (fieldName === "description") {
                return TooltipShared.FILTER_DESCRIPTION_TOOLTIP;
            }
        },

        async getDefaultAndCustomHttpRefs(urlParams, token) {
            let URL = UrlWorkout.HTTP_REFS + urlParams;
            const res = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            return {
                status: res.status,
                body: data
            };
        },

        async getDefaultHttpRefs(urlParams) {
            let URL = UrlWorkout.HTTP_REFS_DEFAULT + urlParams;
            const res = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            return {
                status: res.status,
                body: data
            };
        }
    }
};
</script>
