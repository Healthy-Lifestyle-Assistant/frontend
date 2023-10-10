<template>
    <div class="card me-4 mb-4" style="min-width: 26rem;">
        <div class="card-body">
			<h5 class="card-title">{{ title }}</h5>

			<h6 class="card-subtitle mb-2 text-body-secondary">{{ type }}</h6>

			<p class="card-text">{{ description }}</p>

            <div v-if="bodyParts" class="card-text mb-2">
                <span v-for="bodyPart in bodyParts" :key="bodyPart.id">{{ bodyPart.name }}&nbsp;</span>
            </div>

            <div class="d-flex justify-content-end">
                <router-link to="/workouts-exercises" class="btn btn-primary">Details</router-link>
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
