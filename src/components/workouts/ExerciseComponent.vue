<template>
    <div class="card w-25 mb-3 me-2 bg-dark text-info" style="min-width: 16rem;">
        <div class="card-body">
            <div class="card-title">{{ title }}</div>

            <p class="card-text">{{ description }}</p>

            <p class="card-text">{{ type }}</p>

            <div v-if="bodyParts" class="card-text mb-2">
                <span v-for="bodyPart in bodyParts" :key="bodyPart.id">{{ bodyPart.name }}&nbsp;</span>
            </div>

            <div class="d-flex justify-content-end">
                <a href="#" class="btn btn-outline-info" target="_blank">Details</a>
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
        type: String
    }
}
</script>
  
<style></style>