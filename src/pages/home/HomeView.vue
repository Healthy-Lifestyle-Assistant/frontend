<template>
	<metainfo>
		<template v-slot:title="{ content }">{{ content }}</template>
	</metainfo>

	<div class="d-flex flex-column mb-5" style="width: 90%;">
		<h3 class="mb-4">Maintain Habits For Your Health</h3>

		<p class="lead mb-5">
			A healthy lifestyle is a way of living that lowers the risk of being seriously ill or dying early. Not all
			diseases are preventable, but a large portion of deaths, particularly those from coronary heart disease and lung
			cancer, can be avoided. Scientific studies have identified certain types of behavior that contribute to the
			development of noncommunicable diseases and early death. Health is not just about avoiding disease. It’s also
			about physical, mental and social wellbeing. When a healthy lifestyle is adopted, a more positive model is
			provided for other people in the family, particularly children.
			<br><br>
			Web application aims to support users to change their behavior and improve their health in order to live
			healthier, longer lives.
			<br><br>
			There are template exercises to select. You could also add your custom exercises with your media references
			(YouTube, articles, and so on). One or more exercises should be associated with workout. There are also template
			workouts and the possibility to add custom workouts. <br><br>
			Mental health activities can be found in the meditations section. Nutrition track is
			presented by recipes and supplements. <br><br>
			Once you have created a template or custom workout, nutrition event, or meditation, set a reminder to track it.
			<br><br>
			<em>Web application is under development.</em>
		</p>

		<div>
			<router-link to="/signup" class="btn btn-primary" role="button">Try Development Version</router-link>
		</div>
	</div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
	name: "HomeView",

	setup() {
		useMeta({
			title: "Healthy - Home",
			htmlAttrs: {
				lang: "en"
			}
		})
	},

	async created() {
		this.$store.commit("setCurrentUrl", "/");
	},

	computed: {
		isLogged() {
			return this.$store.state.isLogged;
		}
	}
}
</script>
