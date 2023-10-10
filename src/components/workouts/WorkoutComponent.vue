<template>
	<div class="card w-25 mb-3 me-2" style="min-width: 16rem; background-color: rgb(96, 99, 101); color: white">
		<div class="card-body">
			<div class="card-title">{{ title }}</div>

			<p class="card-text">{{ description }}</p>

			<p class="card-text">{{ type }}</p>

			<div v-if="bodyParts" class="card-text mb-2">
				<span v-for="bodyPart in bodyParts" :key="bodyPart.id">{{ bodyPart.name }}&nbsp;</span>
			</div>

			<div v-if="exercises" class="card-text mb-2">
				<span v-for="exercise in exercises" :key="exercise.id">{{ exercise.title }}&nbsp;</span>
			</div>

			<div class="d-flex justify-content-end">
				<a href="#" class="btn btn-outline-info" target="_blank">Details</a>
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
		bodyParts: Array,
		type: String,
		exercises: Array
	}
}
</script>

<style></style>
