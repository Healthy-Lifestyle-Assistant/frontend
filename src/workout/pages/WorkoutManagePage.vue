<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div>
            <BreadcrumbWorkoutsComponent />
            <AlertListComponent :alerts="alerts" />
            <AlertComponent :message="message" :messageType="messageType" />
        </div>

        <!-- Update Workout -->
        <h4 v-if="!isDeleted" class="mb-4 text-muted">Update Workout</h4>

        <form v-if="!isDeleted" class="mb-5 form-width" @submit.prevent="onSubmitUpdateForm">
            <div class="mb-4">
                <label for="title" class="form-label">Current title: {{ workout.title }}</label>
                <div class="d-flex align-items-center mb-2 me-3">
                    <input type="text" class="form-control me-1" id="title" v-model="formTitle"
                        placeholder="Enter new title">
                    <TooltipComponent :text="getTooltipText('title')" />
                </div>
            </div>

            <div class="mb-4">
                <label for="description" class="form-label">Current descirption:
                    {{ workout.description ? workout.description : "None" }}
                </label>
                <div class="d-flex align-items-center mb-2 me-3">
                    <textarea rows="3" class="form-control me-1" id="description" v-model="formDescription"
                        placeholder="Enter new description"></textarea>
                    <TooltipComponent :text="getTooltipText('description')" />
                </div>
            </div>

            <div class="mb-2">Exercises<span class="span-color"> *</span></div>
            <div v-if="allExercises && allExercises.length > 0"
                class="d-flex flex-row flex-wrap mb-4 elements-border checkboxes-scroll">
                <div v-for="exercise in allExercises" :key="exercise.id" class="me-2 mb-2">
                    <input type="checkbox" value="" class="form-check-input me-1" :id="exercise.title"
                        @click="onClickExerciseCheckbox(exercise.id)"
                        :checked="formSelectedExercisesCheckboxesStates[exercise.id]">
                    <label :for="exercise.title" class="form-check-label exercise-checkbox-width">
                        {{ getTruncatedString(exercise.title, 40) }} ({{ getBodyPartsString(exercise.bodyParts) }})
                    </label>
                </div>
            </div>

            <button @click.prevent="onClearForm" class="btn btn-outline-secondary mt-2 me-2">Clear</button>
            <button type="submit" class="btn btn-secondary mt-2">Update</button>
        </form>

        <!-- Delete workout -->
        <div v-if="!isDeleted" class="form-width">
            <h4 class="mb-2 text-muted">Delete Workout</h4>
            <div class="mb-2">Deletion of the workout will not affect associated exercises and media references.</div>
            <div class="d-flex">
                <input type="checkbox" value="" class="form-check-input" id="confirmDeletion" v-model="confirmDeletion">
                <label for="confirmDeletion" class="form-check-label ms-2"><span class="span-color">Confirm deletion. This
                        action cannot be undone.</span></label>
            </div>

            <form @submit.prevent="onSubmitDeleteForm" style="min-width: 13rem; width: fit-content;" class="mb-5">
                <button :disabled="!confirmDeletion" type="submit" class="btn btn-warning mt-4">Delete</button>
            </form>
            <br>
        </div>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { getToken, getAndValidateToken, on401, redirectToLoginSessionExpired } from "@/shared/js/auth";
import { getStringOrNull, truncateStringWithWordBoundary } from "@/shared/js/stringUtils";
import { buildAlertsList } from "@/shared/js/exceptions";
import { WORKOUTS_SLASH, EXERCISES, PAGE_SIZE } from "@/shared/URL";
import {
    SUCCESS, WARNING, WORKOUT_UPDATED_SUCCESSFULLY,
    WORKOUT_DELETED_SUCCESSFULLY, WORKOUT_SHOULD_HAVE_EXERCISES
} from "@/shared/Messages";
import { DESCRIPTION_TOOLTIP, TITLE_TOOLTIP } from "@/shared/Tooltips";
import AlertComponent from "@/shared/components/AlertComponent.vue";
import AlertListComponent from "@/shared/components/AlertListComponent.vue";
import BreadcrumbWorkoutsComponent from "../components/BreadcrumbWorkoutsComponent.vue";
import TooltipComponent from "@/shared/components/TooltipComponent.vue";

export default {
    name: "WorkoutManagePage",

    components: {
        AlertComponent,
        AlertListComponent,
        BreadcrumbWorkoutsComponent,
        TooltipComponent
    },

    setup() {
        useMeta({
            title: "Manage Workout",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            formTitle: null,
            formDescription: null,
            formSelectedExercisesIds: [],
            formSelectedExercisesCheckboxesStates: {},

            workout: {},
            allExercises: [],

            message: null,
            messageType: null,
            alerts: [],

            isDeleted: false,
            confirmDeletion: false
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", `/workouts-manage-workout/${this.$route.params.id}`);
        const token = await getAndValidateToken(this);

        if (!token) {
            redirectToLoginSessionExpired(this);
        } else {
            this.$store.commit("setLogged", true);
            let responseWorkoutDetails = await this.getWorkoutDetails(this.$route.params.id, token);
            let responseExercises = await this.getDefaultAndCustomExercises(token);

            if (responseWorkoutDetails.status === 200 && responseExercises.status === 200) {
                this.workout = responseWorkoutDetails.body;
                this.allExercises = responseExercises.body.content;
                this.formSelectedExercisesIds = this.workout.exercises.map(exercise => exercise.id);
                this.formSelectedExercisesIds.forEach(id => {
                    this.formSelectedExercisesCheckboxesStates[id] = true;
                });
            } else if (responseWorkoutDetails.status === 401 || responseExercises.status === 401) {
                on401(this);
            } else {
                this.message = null;
                this.messageType = null;
                if (responseWorkoutDetails.status !== 200) {
                    this.alerts = this.alerts.concat(buildAlertsList(responseWorkoutDetails.body, WARNING));
                }
                if (responseExercises.status !== 200) {
                    this.alerts = this.alerts.concat(buildAlertsList(responseExercises.body, WARNING));
                }
            }
        }
    },

    methods: {
        async onSubmitUpdateForm() {
            const requestDto = {
                title: getStringOrNull(this.formTitle),
                description: getStringOrNull(this.formDescription),
                exerciseIds: this.formSelectedExercisesIds
            };

            if (this.formSelectedExercisesIds === null || this.formSelectedExercisesIds.length === 0) {
                alert(WORKOUT_SHOULD_HAVE_EXERCISES);
            } else {
                const token = getToken();
                const response = await this.updateWorkout(requestDto, token);
                if (response.status === 200) {
                    this.workout = response.body;
                    this.onClearForm();
                    this.messageType = SUCCESS;
                    this.message = WORKOUT_UPDATED_SUCCESSFULLY;
                } else if (response.status === 401) {
                    on401(this);
                } else {
                    this.alerts = buildAlertsList(response.body, WARNING);
                }
            }
        },

        async onSubmitDeleteForm() {
            const token = getToken();
            const response = await this.deleteWorkout(this.$route.params.id, token);
            if (response.status === 204) {
                this.messageType = SUCCESS;
                this.message = WORKOUT_DELETED_SUCCESSFULLY;
                this.isDeleted = true;
            } else if (response.status === 401) {
                on401(this);
            } else {
                this.alerts = buildAlertsList(response.body, WARNING);
            }
        },

        onClearForm() {
            this.formTitle = null;
            this.formDescription = null;
            this.formSelectedExercisesIds = this.workout.exercises.map(exercise => exercise.id);
            this.formSelectedExercisesCheckboxesStates = {};
            this.formSelectedExercisesIds.forEach(id => {
                this.formSelectedExercisesCheckboxesStates[id] = true;
            });
            this.message = null;
            this.messageType = null;
            this.alerts = [];
        },

        onClickExerciseCheckbox(id) {
            if (this.formSelectedExercisesIds.includes(id)) {
                let index = this.formSelectedExercisesIds.indexOf(id);
                this.formSelectedExercisesIds.splice(index, 1);
                delete this.formSelectedExercisesCheckboxesStates[id];
            } else {
                this.formSelectedExercisesIds.push(id);
                this.formSelectedExercisesCheckboxesStates[id] = true;
            }
        },

        getTooltipText(fieldName) {
            if (fieldName === "title") {
                return TITLE_TOOLTIP;
            }
            if (fieldName === "description") {
                return DESCRIPTION_TOOLTIP;
            }
        },

        getTruncatedString(string, maxLength) {
            return truncateStringWithWordBoundary(string, maxLength);
        },

        getBodyPartsString(bodyPartsArray) {
            return bodyPartsArray.map(bodyPart =>
                bodyPart.name.split(' ')
                    .map(word => word.charAt(0).toLowerCase() + word.slice(1))
                    .join(' ')
            ).join(', ');
        },

        async getWorkoutDetails(id, token) {
            let URL = WORKOUTS_SLASH + id;
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

        async getDefaultAndCustomExercises(token) {
            let URL = EXERCISES + PAGE_SIZE;
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

        async updateWorkout(requestBody, token) {
            let URL = WORKOUTS_SLASH + this.$route.params.id;
            const response = await fetch(URL, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();
            return {
                status: response.status,
                body: data
            };
        },

        async deleteWorkout(id, token) {
            let URL = WORKOUTS_SLASH + id;
            const response = await fetch(URL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return {
                status: response.status
            };
        }
    }
};
</script>
