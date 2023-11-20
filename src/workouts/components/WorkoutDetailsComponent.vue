<template>
    <div class="w-100">
        <h5 class="card-title mb-3">{{ title }}</h5>

        <h6 class="card-subtitle text-body-secondary mb-2">
            {{ isCustom ? "Custom" : "Default" }},
            {{ needsEquipment ? "With Equipment" : "Without Equipment" }}
        </h6>

        <p v-if="description" class="card-text" style="font-style: italic; text-align: justify; word-wrap: break-word;">
            {{ description }}
        </p>

        <div v-if="bodyParts" class="card-text">
            <span v-for="bodyPart in bodyParts" :key="bodyPart.id"><small class="body-parts">{{
                bodyPart.name.toLowerCase()
            }}</small>&nbsp;</span>
        </div>

        <h5 v-if="exercises" class="text-secondary mb-4 mt-5">Exercises</h5>

        <div v-if="exercises" class="d-flex flex-column">

            <div v-for="elt in exercises" :key="elt.id">
                <ExerciseComponent :id="elt.id" :title="elt.title" :description="elt.description" :bodyParts="elt.bodyParts"
                    :isCustom="elt.custom" :needsEquipment="elt.needsEquipment" />
            </div>

        </div>

    </div>
</template>

<script>
import ExerciseComponent from "../components/ExerciseComponent.vue";

export default {
    name: "WorkoutDetailsComponent",

    props: {
        id: Number,
        title: String,
        description: String,
        bodyParts: Array,
        isCustom: Boolean,
        needsEquipment: Boolean,
        exercises: Object
    },

    components: {
        ExerciseComponent
    },
}
</script>