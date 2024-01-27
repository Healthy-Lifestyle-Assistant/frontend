<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-center">

        <div class="d-flex flex-column align-items-start">
            <div>
                <BreadcrumbWorkoutsComponent />
                <AlertComponent :message="message" :messageType="messageType" /><br>
                <ButtonComponent link="/workouts-create-media" title="New Media" />
                <br><br>
            </div>

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
                    <div class="mb-2 me-3">
                        <input type="text" class="form-control" id="filterName" v-model="filterName"
                            placeholder="Filter by name">
                    </div>

                    <div class="mb-2 me-3">
                        <input type="text" class="form-control" id="filterDescription" v-model="filterDescription"
                            placeholder="Filter by description">
                    </div>
                </div>

                <div class="d-flex flex-row flex-wrap mb-2">
                    <div class="mb-2 me-3">
                        <select id="sortField" v-model="sortField" class="form-select" aria-label="sortField">
                            <option :value="null" disabled>Sort by</option>
                            <option :key="1" :value="'name'">Name</option>
                            <option :key="2" :value="'description'">Description</option>
                        </select>
                    </div>

                    <div class="mb-2 me-3">
                        <select id="sortDirection" v-model="sortDirection" class="form-select" aria-label="sortDirection">
                            <option :value="null" disabled>Order by</option>
                            <option :key="1" :value="'asc'">Ascending</option>
                            <option :key="2" :value="'desc'">Descending</option>
                        </select>
                    </div>

                    <div class="mb-2 me-3">
                        <select id="pageSize" v-model="pageSize" class="form-select" aria-label="pageSize">
                            <option :value="null" disabled>Page size</option>
                            <option :key="1" :value="5">5</option>
                            <option :key="2" :value="10">10</option>
                            <option :key="3" :value="15">15</option>
                        </select>
                    </div>
                </div>

                <div>
                    <button id="clearButton" @click="onClearFilter($event)"
                        class="btn btn-outline-secondary mb-2 me-2">Clear</button>
                    <button id="applyButton" @click="onPageRequest($event, 0)" class="btn btn-secondary mb-2">Apply</button>
                </div>
            </form>

            <AlertComponent :message="filterMessage" :messageType="filterMessageType" /><br>

            <div id="totalElements" v-if="totalElements" class="text-muted mb-2">{{ this.totalElements }} found</div>

            <div v-if="entities && entities.length > 0" class="d-flex flex-row flex-wrap">
                <div v-for="entity in entities" :key="entity.id">
                    <MediaComponent :id="entity.id" :name="entity.name" :description="entity.description"
                        :isCustom="entity.isCustom" :httpRef="entity.ref" />
                </div>
            </div>
        </div>

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
import { getToken } from "../../shared/js/common.js";
import { getAndValidateToken } from "../../shared/js/common.js";
import MediaComponent from "../components/MediaComponent.vue";
import BreadcrumbWorkoutsComponent from "../components/BreadcrumbWorkoutsComponent.vue";
import AlertComponent from "../../shared/components/AlertComponent.vue";
import ButtonComponent from "../../shared/components/ButtonComponent.vue";

export default {
    name: "MediasListPage",

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

            entities: [],

            filterName: null,
            filterDescription: null,
            filterIsDefault: null,
            filterIsCustom: null,
            sortField: null,
            sortDirection: null,
            pageSize: null,
            isCustom: null,

            content: [],
            totalPages: 0,
            totalElements: null,
            pageNumber: 0,
            size: null,
            isFirst: null,
            isLast: null,
            hasNext: null,
            hasPrevious: null,

            message: "",
            messageType: "",

            filterMessage: "",
            filterMessageType: ""
        };
    },

    components: {
        MediaComponent,
        BreadcrumbWorkoutsComponent,
        AlertComponent,
        ButtonComponent
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-media-list");
        this.setIsCustom();
        const token = await getAndValidateToken();

        let response = null;
        if (token) {
            this.$store.commit("setLogged", true);
            response = await this.getHttpRefs(this.getUrlString(0), token);

            if (response.status === 200) {
                if (Array.isArray(response.body.content) && response.body.content.length === 0) {
                    this.filterMessageType = "SECONDARY";
                    this.filterMessage = "Not Found";
                    this.entities = [];
                    this.totalPages = 0;
                    this.pageNumber = 0;
                } else {
                    this.entities = response.body.content;
                    this.totalPages = response.body.totalPages;
                    this.pageNumber = response.body.number;
                    this.totalElements = response.body.totalElements;
                }
            }
            else if (response.status === 401) {
                this.$router.push("/login");
            }
            else {
                this.messageType = "WARNING";
                this.message = `${response.body.message} - ${response.status})`;
            }

        } else {
            this.$store.commit("setLogged", false);
            this.messageType = "SECONDARY";
            this.message = "You are unlogged";
            const urlString = this.getUrlString(0);
            response = await this.getDefaultHttpRefs(urlString);

            if (response.status === 200) {
                if (Array.isArray(response.body.content) && response.body.content.length === 0) {
                    this.filterMessageType = "SECONDARY";
                    this.filterMessage = "Not Found";
                    this.entities = [];
                    this.totalPages = 0;
                    this.pageNumber = 0;
                } else {
                    this.entities = response.body.content;
                    this.totalPages = response.body.totalPages;
                    this.pageNumber = response.body.number;
                    this.totalElements = response.body.totalElements;
                }
            }
            else {
                this.messageType = "WARNING";
                this.message = `${response.body.message} - ${response.status}`;
            }
        }
    },

    methods: {
        onFilterToggle() {
            this.isFilterVisible = !this.isFilterVisible;
            this.filterButtonText = this.isFilterVisible ? "Hide" : "Filter";
        },

        onClearFilter(event) {
            event.preventDefault();
            this.filterName = null;
            this.filterDescription = null;
            this.sortField = null;
            this.sortDirection = null;
            this.pageSize = null;
        },

        setIsCustom() {
            if (this.filterIsCustom === true && (this.filterIsDefault === null || this.filterIsDefault === false)) this.isCustom = true;
            else if (this.filterIsDefault === true && (this.filterIsCustom === null || this.filterIsCustom === false)) this.isCustom = false;
            else this.isCustom = null;
        },

        getUrlString(pageNumber) {
            let urlString = `?pageNumber=${pageNumber}`;
            if (this.pageSize !== null) urlString += `&pageSize=${this.pageSize}`;
            if (this.isCustom !== null) urlString += `&isCustom=${this.isCustom}`;
            if (this.filterName !== null && this.filterName.trim() !== "") urlString += `&name=${this.filterName.trim()}`;
            if (this.filterDescription !== null && this.filterDescription.trim() !== "")
                urlString += `&description=${this.filterDescription.trim()}`;
            if (this.sortField !== null) urlString += `&sortField=${this.sortField}`;
            if (this.sortDirection !== null) urlString += `&sortDirection=${this.sortDirection}`;
            return urlString;
        },

        async onPageRequest(event, pageNumber) {
            event.preventDefault();
            this.filterMessageType = "";
            this.filterMessage = "";
            this.totalElements = null;
            this.setIsCustom();
            const urlString = this.getUrlString(pageNumber);

            const isLogged = this.$store.state.isLogged;
            let response = null;
            if (isLogged) {
                const token = getToken();
                response = await this.getHttpRefs(urlString, token);
            } else {
                response = await this.getDefaultHttpRefs(urlString);
            }

            if (response.status === 200) {
                if (Array.isArray(response.body.content) && response.body.content.length === 0) {
                    this.filterMessageType = "SECONDARY";
                    this.filterMessage = "Not Found";
                    this.entities = [];
                    this.totalPages = 0;
                    this.pageNumber = 0;
                } else {
                    this.entities = response.body.content;
                    this.totalPages = response.body.totalPages;
                    this.pageNumber = response.body.number;
                    this.totalElements = response.body.totalElements;
                }
            }
            else if (response.status === 401) {
                this.$router.push("/login");
            }
            else {
                this.messageType = "WARNING";
                this.message = `${response.body.message} - ${response.status}`;
            }
        },

        async getHttpRefs(urlParams, token) {
            let URL = "/api/v1/workouts/httpRefs" + urlParams;
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
            let URL = "/api/v1/workouts/httpRefs/default" + urlParams;
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
