<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">
        <div class="mb-4">
            <BreadcrumbMentalsComponent />
            <AlertListComponent :alerts="alerts" />
            <AlertComponent :message="message" :messageType="messageType" />
            <ButtonComponent link="/mentals-create-mental" title="New Mental" />
        </div>

        <!-- Filter -->
        <button id="filterButton" @click="onFilterToggle" class="btn btn-secondary mb-3">{{ filterButtonText }}</button>
        <form class="filter-width"
            :class="{ 'd-flex flex-column align-items-start mb-3': isFilterVisible, 'd-none': !isFilterVisible }">

            <div class="d-flex flex-row flex-wrap mb-2">
                <div v-if="$store.state.isLogged" class="form-check me-3">
                    <input type="checkbox" value="" class="form-check-input" id="filterIsCustom" v-model="filterIsCustom">
                    <label for="filterIsCustom" class="form-check-label">Custom</label>
                </div>

                <div v-if="$store.state.isLogged" class="form-check me-3">
                    <input type="checkbox" value="" class="form-check-input" id="filterIsDefault" v-model="filterIsDefault">
                    <label for="filterIsDefault" class="form-check-label">Default</label>
                </div>

                <div class="form-check me-3">
                    <input type="checkbox" value="" class="form-check-input" id="filterTypeAffirmation"
                        v-model="filterTypeAffirmation">
                    <label for="filterTypeAffirmation" class="form-check-label">Affirmation</label>
                </div>

                <div class="form-check me-3">
                    <input type="checkbox" value="" class="form-check-input" id="filterTypeMeditation"
                        v-model="filterTypeMeditation">
                    <label for="filterTypeMeditation" class="form-check-label">Meditation</label>
                </div>
            </div>

            <div class="d-flex flex-row flex-wrap mb-2">
                <div class="d-flex align-items-center mb-2 me-3">
                    <input type="text" class="form-control me-1" id="filterTitle" v-model="filterTitle"
                        placeholder="Filter by title">
                    <TooltipComponent :text="getTooltipText('title')" />
                </div>

                <div class="d-flex align-items-center mb-2 me-3">
                    <input type="text" class="form-control me-1" id="filterDescription" v-model="filterDescription"
                        placeholder="Filter by description">
                    <TooltipComponent :text="getTooltipText('description')" />
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
                    <select id="sortDirection" v-model="filterSortDirection" class="form-select" aria-label="sortDirection">
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
                    class="btn btn-outline-secondary mb-2 me-2">Clear</button>
                <button id="applyButton" @click="onPageRequest($event, 0)" class="btn btn-secondary mb-2">Apply</button>
            </div>
        </form>

        <!-- Mentals List -->
        <AlertComponent :message="filterMessage" :messageType="filterMessageType" /><br>

        <div id="totalElements" v-if="totalElements" class="text-muted mb-2">{{ this.totalElements }} found</div>

        <div v-if="mentals && ementals.length > 0" class="d-flex flex-row flex-wrap">
            <div v-for="mental in mental" :key="mental.id">
                <MentalComponent :id="mental.id" :title="mental.title" :description="mental.description"
                    :type="mental.type" :isCustom="mental.isCustom" />
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
import { useMeta } from "vue-meta";
import { getToken, getAndValidateToken, on401 } from "@/shared/js/auth";
import { buildAlertsList } from "@/shared/js/exceptions";
import { MENTALS, MENTALS_DEFAULT } from "@/shared/URL";
import { SECONDARY, NOT_FOUND, WARNING, YOUR_ARE_UNLOGGED } from "@/shared/Messages";
import { FILTER_DESCRIPTION_TOOLTIP, FILTER_TITLE_TOOLTIP } from "@/shared/Tooltips";
import AlertComponent from "@/shared/components/AlertComponent.vue";
import AlertListComponent from "@/shared/components/AlertListComponent.vue";
import ButtonComponent from "@/shared/components/ButtonComponent.vue";
import MentalComponent from "../components/MentalComponent.vue";
import BreadcrumbMentalsComponent from "../components/BreadcrumbMentalsComponent.vue";
import TooltipComponent from "@/shared/components/TooltipComponent.vue";

export default {
    name: "MentalsListPage",

    components: {
        MentalComponent,
        BreadcrumbMentalsComponent,
        AlertComponent,
        AlertListComponent,
        ButtonComponent,
        TooltipComponent
    },

    setup() {
        useMeta({
            title: "Mentals",
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
            filterTypeAffirmation: null,
            filterTypeMeditation: null,
            filterSortField: null,
            filterSortDirection: null,
            filterPageSize: null,
            filterIsCustomRequestValue: null,
            filterTypeRequestValue: null,

            mentals: [],
           

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
        this.$store.commit("setCurrentUrl", "/mentals-list");
        const token = await getAndValidateToken(this);

        if (token) {
            this.$store.commit("setLogged", true);
        } else {
            this.$store.commit("setLogged", false);
            this.messageType = SECONDARY;
            this.message = YOUR_ARE_UNLOGGED;
        }
        const defaultPageNumber = 0;
        await this.onPageRequest(null, defaultPageNumber);
    },

    methods: {
        async onPageRequest(event, pageNumber) {
            if (event === null) {
                // do nothing;
            }
            else {
                event.preventDefault();
            }
            this.setIsCustomRequestValue();
            this.setNeedsEquipmentRequestValue();
            this.clearAlerts();
            const urlString = this.getUrlString(pageNumber);
            const isLogged = this.$store.state.isLogged;

            let response = null;
            if (isLogged) {
                const token = getToken();
                response = await this.getDefaultAndCustomMentals(urlString, token);
            } else {
                response = await this.getDefaultMentals(urlString);
            }

            if (response.status === 200) {
                if (Array.isArray(response.body.content) && response.body.content.length === 0) {
                    this.filterMessageType = SECONDARY;
                    this.filterMessage = NOT_FOUND;
                    this.mentals = [];
                    this.totalPages = 0;
                    this.pageNumber = 0;
                    this.totalElements = null;
                } else {
                    this.mentals = response.body.content;
                    this.totalPages = response.body.totalPages;
                    this.pageNumber = response.body.number;
                    this.totalElements = response.body.totalElements;
                }
            } else if (isLogged && response.status === 401) {
                on401(this);
            }
            else {
                this.alerts = buildAlertsList(response.body, WARNING);
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
            //if (this.filterNeedsEquipmentRequestValue != null) {
             //   urlString += `&needsEquipment=${this.filterNeedsEquipmentRequestValue}`;
            //}
            if (this.filterTitle !== null && this.filterTitle.trim() !== "") {
                urlString += `&title=${this.filterTitle.trim()}`;
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

        onClearFilter() {
            this.filterTitle = null;
            this.filterDescription = null;
            this.filterTypeAffirmation = null;
            this.filterTypeMeditation = null;
            this.filterTypeRequestValue = null;
            this.filterIsCustom = null;
            this.filterIsDefault = null;
            this.filterIsCustomRequestValue = null;
            this.filterSortField = null;
            this.filterSortDirection = null;
            this.filterPageSize = null;
           // this.filterSelectedBodyPartsIds = [];
           // this.filterSelectedBodyPartsCheckboxesStates = {};
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
            if (this.filterIsCustom === true && (this.filterIsDefault === null || this.filterIsDefault === false)) {
                this.filterIsCustomRequestValue = true;
            }
            else if (this.filterIsDefault === true && (this.filterIsCustom === null || this.filterIsCustom === false)) {
                this.filterIsCustomRequestValue = false;
            }
            else {
                this.filterIsCustomRequestValue = null;
            }
        },

        setNeedsEquipmentRequestValue() {
            if (this.filterWithEquipment === true && (this.filterWithoutEquipment === null || this.filterWithoutEquipment === false)) {
                this.filterNeedsEquipmentRequestValue = true;
            }
            else if (this.filterWithoutEquipment === true && (this.filterWithEquipment === null || this.filterWithEquipment === false)) {
                this.filterNeedsEquipmentRequestValue = false;
            }
            else {
                this.filterNeedsEquipmentRequestValue = null;
            }
        },

        getTooltipText(fieldName) {
            if (fieldName === "title") {
                return FILTER_TITLE_TOOLTIP;
            }
            if (fieldName === "description") {
                return FILTER_DESCRIPTION_TOOLTIP;
            }
        },

        async getDefaultMentals(urlParams) {
            let URL = MENTALS_DEFAULT + urlParams;
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

        async getDefaultAndCustomMentals(urlParams, token) {
            let URL = MENTALS + urlParams;
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

       // async getDefaultBodyParts() {
        //    const response = await fetch(BODY_PARTS, {
        //        method: "GET",
        //        headers: {
        //            "Content-Type": "application/json"
        //        }
        //    });
         //   const data = await response.json();
         //   return {
         //       status: response.status,
         //       body: data
          //  };
        //}
    }
};
</script>
