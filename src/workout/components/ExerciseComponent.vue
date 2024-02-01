<template>
    <div class="card mb-3 me-3 exercise-card-width">
        <div class="card-body">
            <h5 class="card-title">{{ truncatedTitle }}</h5>

            <h6 class="card-subtitle mb-2 text-body-secondary">{{ isCustom ? "Custom" : "Default" }}, {{ needsEquipment ?
                "With Equipment" : "Without Equipment" }}</h6>

            <p v-if="description" class="card-text">{{ truncatedDescription }}</p>

            <div v-if="bodyParts" class="card-text">
                <span class="body-parts-span" v-for="bodyPart in bodyParts" :key="bodyPart.id"><small class="body-parts">{{
                    bodyPart.name.toLowerCase()
                }}</small>&nbsp;</span>
            </div>

            <div v-if="isCustom" class="d-flex justify-content-end mt-3 me-4">
                <router-link :to="generateLinkManage()" class="btn btn-outline-secondary d-block me-3">Manage</router-link>
                <router-link :to="generateLinkDetails()" class="btn btn-outline-secondary">Details</router-link>
            </div>

            <div v-else class="d-flex justify-content-end me-4">
                <router-link :to="generateLinkDetails()" class="btn btn-outline-secondary">Details</router-link>
            </div>
        </div>
    </div>
</template>
  
<script>
import { truncateStringWithWordBoundary } from "../../shared/js/stringUtils";

export default {
    name: "ExerciseComponent",

    props: {
        id: Number,
        title: String,
        description: String,
        bodyParts: Array,
        isCustom: Boolean,
        needsEquipment: Boolean
    },

    methods: {
        generateLinkDetails() {
            return `/workouts-exercise-details/${this.isCustom ? 'custom' : 'default'}/${this.id}`;
        },

        generateLinkManage() {
            return `/workouts-manage-exercise/${this.id}`;
        },
    },

    computed: {
        truncatedTitle() {
            return truncateStringWithWordBoundary(this.title, 23);
        },

        truncatedDescription() {
            return truncateStringWithWordBoundary(this.description, 100);
        }
    }
}
</script>
