<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-center">
        <div class="d-flex flex-column align-items-start">
            <div>
                <BreadcrumbWorkoutsComponent />
                <AlertComponent :message="message" :messageType="messageType" /><br>
                <ButtonComponent link="/workouts-create-workout" title="New Workout" />
                <br><br>
            </div>

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
                    <div class="mb-2 me-3">
                        <input type="text" class="form-control" id="filterTitle" v-model="filterTitle"
                            placeholder="Filter by title">
                    </div>

                    <div class="mb-2 me-3">
                        <input type="text" class="form-control" id="filterDescription" v-model="filterDescription"
                            placeholder="Filter by description">
                    </div>
                </div>

                <div v-if="bodyParts && bodyParts.length > 0" class="d-flex flex-row flex-wrap mb-2">
                    <div v-for="bodyPart in bodyParts" :key="bodyPart.id" class="me-2">
                        <input type="checkbox" value="" class="form-check-input" :id="bodyPart.name"
                            @click="onClickBodyPartCheckbox(bodyPart.id)" :checked="bodyPartsStates[bodyPart.id]">
                        <label :for="bodyPart.name" class="form-check-label">{{ bodyPart.name }}</label>
                    </div>
                </div>

                <div  class="d-flex flex-row flex-wrap mb-2">
                    <div class="mb-2 me-3">
                        <select id="sortField" v-model="sortField" class="form-select" aria-label="sortField">
                            <option :value="null" disabled>Sort by</option>
                            <option :key="1" :value="'name'">Name</option>
                            <option :key="2" :value="'description'">Description</option>
                        </select>
                    </div>

                    <div class="mb-2 me-3">
                        <select id="sortDirection" v-model="sortDirection" class="form-select" aria-label="sortDirection">
                            <option :value="null" disabled>Direction</option>
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
                    <WorkoutComponent :id="entity.id" :title="entity.title" :description="entity.description"
                        :bodyParts="entity.bodyParts" :isCustom="entity.isCustom" :needsEquipment="entity.needsEquipment"
                        :exercises="entity.exercises" />
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
import WorkoutComponent from "../components/WorkoutComponent.vue";
import BreadcrumbWorkoutsComponent from "../components/BreadcrumbWorkoutsComponent.vue";
import AlertComponent from "../../shared/components/AlertComponent.vue";
import ButtonComponent from "../../shared/components/ButtonComponent.vue";

export default {
    name: "WorkoutsListPage",

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

            entities: [],
            bodyParts: [],

            filterTitle: null,
            filterDescription: null,
            filterIsDefault: null,
            filterIsCustom: null,
            filterWithEquipment: null,
            filterWithoutEquipment: null,
            bodyPartsIds: [],
            bodyPartsStates: {},
            sortField: null,
            sortDirection: null,
            pageSize: null,
            isCustom: null,
            needsEquipment: null,

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

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-list");
        this.setIsCustom();
        this.setNeedsEquipment();
        const token = await getAndValidateToken();

        let bodyPartsResponse = await this.getBodyParts();
        if (bodyPartsResponse.status == 200) {
            this.bodyParts = bodyPartsResponse.body;
        }

        let entitiesResponse = null;
        if (token) {
            this.$store.commit("setLogged", true);
            entitiesResponse = await this.getWorkouts(this.getUrlString(0), token);

            if (entitiesResponse.status === 200) {
                if (Array.isArray(entitiesResponse.body.content) && entitiesResponse.body.content.length === 0) {
                    this.filterMessageType = "SECONDARY";
                    this.filterMessage = "Not Found";
                    this.httpRefs = [];
                    this.totalPages = 0;
                    this.pageNumber = 0;
                } else {
                    this.entities = entitiesResponse.body.content;
                    this.totalPages = entitiesResponse.body.totalPages;
                    this.pageNumber = entitiesResponse.body.number;
                    this.totalElements = entitiesResponse.body.totalElements;
                }
            }
            else if (entitiesResponse.status === 401) {
                this.$router.push("/login");
            }
            else {
                this.messageType = "WARNING";
                this.message = `${entitiesResponse.body.message} - ${entitiesResponse.status})`;
            }

        } else {
            this.$store.commit("setLogged", false);
            this.messageType = "SECONDARY";
            this.message = "You are unlogged";
            const urlString = this.getUrlString(0);
            entitiesResponse = await this.getDefaultWorkouts(urlString);

            if (entitiesResponse.status === 200) {
                if (Array.isArray(entitiesResponse.body.content) && entitiesResponse.body.content.length === 0) {
                    this.filterMessageType = "SECONDARY";
                    this.filterMessage = "Not Found";
                    this.entities = [];
                    this.totalPages = 0;
                    this.pageNumber = 0;
                } else {
                    this.entities = entitiesResponse.body.content;
                    this.totalPages = entitiesResponse.body.totalPages;
                    this.pageNumber = entitiesResponse.body.number;
                    this.totalElements = entitiesResponse.body.totalElements;
                }
            }
            else {
                this.messageType = "WARNING";
                this.message = `${entitiesResponse.body.message} - ${entitiesResponse.status}`;
            }
        }
    },

    components: {
        WorkoutComponent,
        BreadcrumbWorkoutsComponent,
        AlertComponent,
        ButtonComponent
    },

    methods: {
        onFilterToggle() {
            this.isFilterVisible = !this.isFilterVisible;
            this.filterButtonText = this.isFilterVisible ? "Hide Filter" : "Filter";
        },

        onClearFilter(event) {
            event.preventDefault();
            this.filterWithEquipment = null;
            this.filterWithoutEquipment = null;
            this.filterTitle = null;
            this.filterDescription = null;
            this.bodyPartsIds = [];
            this.sortField = null;
            this.sortDirection = null;
            this.pageSize = null;
            this.bodyPartsStates = {};
        },

        onClickBodyPartCheckbox(id) {
            if (this.bodyPartsIds.includes(id)) {
                let index = this.bodyPartsIds.indexOf(id);
                this.bodyPartsIds.splice(index, 1);
                delete this.bodyPartsStates[id];
            } else {
                this.bodyPartsIds.push(id);
                this.bodyPartsStates[id] = true;
            }
        },

        setIsCustom() {
            if (this.filterIsCustom === true && (this.filterIsDefault === null || this.filterIsDefault === false)) {
                this.isCustom = true;
            }
            else if (this.filterIsDefault === true && (this.filterIsCustom === null || this.filterIsCustom === false)) {
                this.isCustom = false;
            }
            else {
                this.isCustom = null;
            }
        },

        setNeedsEquipment() {
            if (this.filterWithEquipment === true && (this.filterWithoutEquipment === null || this.filterWithoutEquipment === false)) {
                this.needsEquipment = true;
            }
            else if (this.filterWithoutEquipment === true && (this.filterWithEquipment === null || this.filterWithEquipment === false)) {
                this.needsEquipment = false;
            }
            else {
                this.needsEquipment = null;
            }
        },

        getUrlString(pageNumber) {
            let urlString = `?pageNumber=${pageNumber}`;
            if (this.pageSize !== null) urlString += `&pageSize=${this.pageSize}`;
            if (this.isCustom !== null) urlString += `&isCustom=${this.isCustom}`;
            if (this.needsEquipment != null) urlString += `&needsEquipment=${this.needsEquipment}`;
            if (this.filterTitle !== null && this.filterTitle.trim() !== "") urlString += `&title=${this.filterTitle.trim()}`;
            if (this.filterDescription !== null && this.filterDescription.trim() !== "")
                urlString += `&description=${this.filterDescription.trim()}`;
            if (this.bodyPartsIds && this.bodyPartsIds.length > 0) {
                let bodyPartsIdsString = "&bodyPartsIds=";
                for (let i = 0; i < this.bodyPartsIds.length; i++) {
                    bodyPartsIdsString += `${this.bodyPartsIds[i]},`
                }
                bodyPartsIdsString = bodyPartsIdsString.slice(0, bodyPartsIdsString.length - 1);
                urlString += bodyPartsIdsString;
            }
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
            this.setNeedsEquipment();
            const urlString = this.getUrlString(pageNumber);

            const isLogged = this.$store.state.isLogged;
            let response = null;
            if (isLogged) {
                const token = getToken();
                response = await this.getWorkouts(urlString, token);
            } else {
                response = await this.getDefaultWorkouts(urlString);
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

        async getDefaultWorkouts(urlParams) {
            let URL = "/api/v1/workouts/default" + urlParams;

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
        },

        async getWorkouts(urlParams, token) {
            let URL = "/api/v1/workouts" + urlParams;

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

        async getBodyParts() {
            let URL = "/api/v1/workouts/bodyParts";

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
}
</script>
