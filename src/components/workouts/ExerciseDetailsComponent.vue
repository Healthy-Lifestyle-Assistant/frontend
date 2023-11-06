<template>
    <div class="card me-4 mb-4 w-auto">
        <div class="card-body">
            <div class="row">
                <div class="col-md-8">
                    <h5 class="card-title">{{ title }}</h5>
                </div>

                <div class="col-md-4">
                    <h6 class="card-subtitle">{{ isCustom ? "Custom" : "Default" }}</h6>
                </div>
            </div>

            <div class="row">
                <div class="col-md-8">
                    <p class="card-text" style="text-align: justify; word-wrap: break-word;">{{ description }}</p>
                </div>

                <div class="col-md-4">
                    <div v-if="bodyParts" class="card-text mb-2">
                        <span v-for="bodyPart in bodyParts" :key="bodyPart.id"><small style="white-space: nowrap;">{{ bodyPart.name.toLowerCase()
                        }}</small>&nbsp;</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="httpRefs" class="d-flex flex-wrap">
        <div v-for="elt in httpRefs" :key="elt.id">
            <MediaComponent :name="elt.name" :description="elt.description" :isCustom="elt.custom" :httpRef="elt.ref" />
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
    }
}
</script>