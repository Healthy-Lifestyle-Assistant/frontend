<template>
	<div>
		<h4>Workout Component</h4>
		<p>Title - {{ title }}</p>
		<p>Description - {{ description }}</p>
		<p>Body parts - {{ bodyParts }}</p>
		<p>Type - {{ type }}</p>
	</div>
</template>

<script>
export default {
	name: "WorkoutComponent",

	props: {
		id: Number,
		title: String,
		description: String,
		bodyParts: String,
		type: String
	}
}
</script>

<style></style>
