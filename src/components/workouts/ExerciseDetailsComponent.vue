<template>
    <div class="card" style="max-width: 38rem;">
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>

            <h6 class="card-subtitle mb-2">{{ isCustom ? "Custom" : "Default" }}, {{ needsEquipment ?
                "With Equipment" : "Without Equipment" }}</h6>

            <p class="card-text" style="font-style: italic; text-align: justify; word-wrap: break-word;">{{description}}</p>
           
           <div v-if="bodyParts" class="card-text">
                <span v-for="bodyPart in bodyParts" :key="bodyPart.id"><small style="white-space: nowrap;">{{ bodyPart.name.toLowerCase()
                }}</small>&nbsp;</span>
            </div>
        </div>

        <div style="margin-left: 16px;">
            <div v-if="httpRefs" class="d-flex flex-wrap justify-content-center justify-content-lg-start">
                <div v-for="elt in httpRefs" :key="elt.id">
                    <MediaComponent :name="elt.name" :description="elt.description" :isCustom="elt.custom" :httpRef="elt.ref"/>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>

import MediaComponent from "../../components/workouts/MediaComponent.vue";

export default {
    name: "ExerciseDetailsComponent",

    props: {
        id: Number,
        title: String,
        description: String,
        bodyParts: Array,
        isCustom: Boolean,
        needsEquipment: Boolean,
        httpRefs: Object
    },

    components: {
        MediaComponent
    },
}
</script>