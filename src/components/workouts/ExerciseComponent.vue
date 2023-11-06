<template>
    <div class="card me-4 mb-4" style="min-width: 16rem; max-width: 16rem;">
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>

            <h6 class="card-subtitle mb-2 text-body-secondary">{{ isCustom ? "Custom" : "Default" }}, {{ needsEquipment ?
                "With Equipment" : "Without Equipment" }}</h6>

            <p class="card-text">{{ description }}</p>

            <div v-if="bodyParts" class="card-text mb-2">
                <span v-for="bodyPart in bodyParts" :key="bodyPart.id"><small>{{ bodyPart.name.toLowerCase()
                }}</small>&nbsp;</span>
            </div>

            <div class="d-flex justify-content-end">
                <router-link :to="generateLink()" class="btn btn-outline-secondary">Details</router-link>
            </div>
        </div>
    </div>
</template>
  
<script>
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
        generateLink() {
            if(!this.isCustom) return `/workouts-exercise-details/default/${this.id}`;
            else return "/workouts-exercises"
        }
     }
}
</script>
