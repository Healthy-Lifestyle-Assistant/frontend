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

        <h4 class="mb-4 text-muted">Create Workout</h4>

        <form @submit.prevent="onSubmitForm" class="mb-5 form-width">
            <div class="mb-4">
                <label for="title" class="form-label">Title<span class="span-color"> *</span></label>
                <div class="d-flex align-items-center mb-2 me-3">
                    <input type="text" class="form-control me-1" id="title" v-model="formTitle" placeholder="Enter title"
                        required>
                    <TooltipComponent :text="getTooltipText('title')" />
                </div>
            </div>

            <div class="mb-4">
                <label for="description" class="form-label">Description</label>
                <div class="d-flex align-items-center mb-2 me-3">
                    <textarea rows="3" class="form-control me-1" id="description" v-model="formDescription"
                        placeholder="Enter description (optional)"></textarea>
                    <TooltipComponent :text="getTooltipText('description')" />
                </div>
            </div>

            <div class="mb-2">Exercises<span class="span-color"> *</span></div>
            <div v-if="exercises && exercises.length > 0"
                class="d-flex flex-row flex-wrap mb-4 elements-border checkboxes-scroll">
                <div v-for="exercise in exercises" :key="exercise.id" class="me-2 mb-2">
                    <input type="checkbox" value="" class="form-check-input me-1" :id="exercise.title"
                        @click="onClickExerciseCheckbox(exercise.id)"
                        :checked="formSelectedExercisesCheckboxesStates[exercise.id]">
                    <label :for="exercise.title" class="form-check-label exercise-checkbox-width">
                        {{ getTruncatedString(exercise.title, 40) }} ({{ getBodyPartsString(exercise.bodyParts) }})
                    </label>
                </div>
            </div>

            <div>
                <span class="span-color">* </span><i>Required fields</i>
            </div>

            <button @click.prevent="onClearForm" class="btn btn-outline-secondary mt-4 me-2">Clear</button>
            <button type="submit" class="btn btn-secondary mt-4">Create</button>
            <br><br>
        </form>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { getToken, getAndValidateToken, on401, redirectToLoginCreateNewEntity } from "@/shared/js/auth";
import { getStringOrNull, truncateStringWithWordBoundary } from "@/shared/js/stringUtils";
import { buildAlertsList } from "@/shared/js/exceptions";
import { WORKOUTS, EXERCISES, PAGE_SIZE } from "@/shared/URL";
import { SUCCESS, WARNING, WORKOUT_CREATED_SUCCESSFULLY, WORKOUT_SHOULD_HAVE_EXERCISES } from "@/shared/Messages";
import { DESCRIPTION_TOOLTIP, TITLE_TOOLTIP } from "@/shared/Tooltips";
import AlertComponent from "@/shared/components/AlertComponent.vue";
import AlertListComponent from "@/shared/components/AlertListComponent.vue";
import BreadcrumbWorkoutsComponent from "../components/BreadcrumbWorkoutsComponent.vue";
import TooltipComponent from "@/shared/components/TooltipComponent.vue";

export default {
    name: "WorkoutCreatePage",

    components: {
        AlertComponent,
        AlertListComponent,
        BreadcrumbWorkoutsComponent,
        TooltipComponent
    },

    setup() {
        useMeta({
            title: "Create Workout",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            formTitle: null,
            formDescription: null,
            formSelectedExerciseIds: [],
            formSelectedExercisesCheckboxesStates: {},

            exercises: [],

            message: null,
            messageType: null,
            alerts: []
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-create-workout");
        const token = await getAndValidateToken(this);

        if (!token) {
            redirectToLoginCreateNewEntity(this);
        } else {
            this.$store.commit("setLogged", true);
            let response = await this.getDefaultAndCustomExercises(token);
            if (response.status === 200) {
                this.exercises = response.body.content;
            } else if (response.status === 401) {
                on401(this);
            } else {
                this.alerts = buildAlertsList(response.body, WARNING);
            }
        }
    },

    methods: {
        async onSubmitForm() {
            if (this.formSelectedExerciseIds === null || this.formSelectedExerciseIds.length === 0) {
                alert(WORKOUT_SHOULD_HAVE_EXERCISES);
            } else {
                const requestDto = {
                    title: getStringOrNull(this.formTitle),
                    description: getStringOrNull(this.formDescription),
                    exerciseIds: this.formSelectedExerciseIds
                };

                const response = await this.createWorkout(requestDto);
                if (response.status === 201) {
                    this.onClearForm();
                    this.messageType = SUCCESS;
                    this.message = WORKOUT_CREATED_SUCCESSFULLY;
                } else if (response.status === 401) {
                    on401(this);
                } else {
                    this.message = null;
                    this.messageType = null;
                    this.alerts = buildAlertsList(response.body, WARNING);
                }
            }
        },

        onClearForm() {
            this.formTitle = null;
            this.formDescription = null;
            this.formSelectedExerciseIds = [];
            this.formSelectedExercisesCheckboxesStates = {};
            this.message = null;
            this.messageType = null;
            this.alerts = [];
        },

        onClickExerciseCheckbox(id) {
            if (this.formSelectedExerciseIds.includes(id)) {
                let index = this.formSelectedExerciseIds.indexOf(id);
                this.formSelectedExerciseIds.splice(index, 1);
                delete this.formSelectedExercisesCheckboxesStates[id];
            } else {
                this.formSelectedExerciseIds.push(id);
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

        async createWorkout(requestBody) {
            let token = getToken();
            const res = await fetch(WORKOUTS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });
            const data = await res.json();
            return {
                status: res.status,
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
        }
    }
};
</script>
