<template>
	<div class="card me-4 mb-4" style="min-width: 20rem; max-width: 20rem;">
		<div class="card-body">
			<h5 class="card-title">{{ title }}</h5>

			<h6 class="card-subtitle mb-2 text-body-secondary">{{ custom ? "Custom" : "Default" }}, {{ needsEquipment ?
				"With Equipment" : "Without Equipment" }}</h6>

			<p class="card-text">{{ description }}</p>

			<div v-if="bodyParts" class="card-text mb-4">
				<span v-for="bodyPart in bodyParts" :key="bodyPart.id"><small class="body-parts">{{ bodyPart.name.toLowerCase()
				}}</small>&nbsp;</span>
			</div>

			<h6 class="card-subtitle mb-2 mt-4 text-body-secondary">Exercises</h6>
			<div v-if="exercises" class="card-text mb-2">
				<span v-for="exercise in exercises" :key="exercise.id">
					<router-link class="media-refs d-inline-block mt-2 mb-2" :to="generateExerciseLink(exercise.id)">{{ exercise.title }}</router-link>
					&nbsp;</span>
			</div>

			<div class="d-flex justify-content-end">
				<router-link to="/workouts" class="btn btn-outline-secondary">Details</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "WorkoutComponent",

	props: {
		id: Number,
		title: String,
		description: String,
		custom: Boolean,
		needsEquipment: Boolean,
		bodyParts: Array,
		exercises: Array
	},

	methods: {
        generateExerciseLink(exerciseId) {
            return `/workouts-exercise-details/default/${exerciseId}`;
        }
    }
}
</script>
