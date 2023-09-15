<template>
	<metainfo>
		<template v-slot:title="{ content }">{{ content }}</template>
	</metainfo>

	<div class="d-flex flex-column align-items-center w-75 mb-5">
		<h3 class="mb-3">Assist Your Personal Transformation</h3>
		<p class="lead mb-5">
			A journey of personal growth and transformation towards a healthier and more vital life. Users of
			the web application could be on a path of self-improvement, making positive lifestyle changes to boost their
			vitality. <br><br>
			There're template exercises to pick off. You could also add your custom exercises with your media references
			(YouTube, articles, and so on). One or more exercises should be associated with workout. There’re also template
			workouts and the possibility to add custom workouts. <br><br>
			Mental health, relaxation, and spiritual activities can be found in the meditations section. Nutrition track is
			presented by recipes and supplements. <br><br>
			Once you’ve created a template or custom workout, nutrition event, or meditation, set a reminder to track it.
			<br><br>
			<em>This web application is still under development.</em>
		</p>
		<div>
			<router-link to="/signup" class="btn btn-info" role="button">Try Development Version</router-link>
		</div>
	</div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
	name: "HomeView",

	setup() {
		useMeta({
			title: "Healthy Lifestyle Home",
			htmlAttrs: {
				lang: "en"
			}
		})
	},

	computed: {
		isLogged() {
			return this.$store.state.isLogged;
		}
	},

	async created() {
		this.$store.commit("setCurrentUrl", "/");
	}
}
</script>
