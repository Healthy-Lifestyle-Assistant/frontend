<template>
	<metainfo>
		<template v-slot:title="{ content }">{{ content }}</template>
	</metainfo>

	<div class="d-flex flex-column mb-5" style="width: 90%;">
		<h3 class="mb-4">Maintain Habits For Your Health</h3>

		<p class="lead mb-5">
			Healthy Lifestyle Assistant is a Ukrainian non-profit startup promoting a healthy lifestyle using digital
			technologies. Our web application helps people maintain good habits like workouts, nutrition, and mental health
			activities.
			<br><br>
			A healthy lifestyle is a way of living that lowers the risk of being seriously ill or dying early. Not all
			diseases are preventable, but a large portion of deaths, particularly those from coronary heart disease and lung
			cancer, can be avoided. Scientific studies have identified certain types of behavior that contribute to the
			development of noncommunicable diseases and early death. Health is not just about avoiding disease. It’s also
			about physical, mental and social wellbeing. When a healthy lifestyle is adopted, a more positive model is
			provided for other people in the family, particularly children.
			<br><br>
			Web application aims to support people to change their behavior and improve their health in order to live
			healthier, longer lives.
		</p>

		<div>
			<router-link to="/signup" class="btn btn-primary" role="button">Try Development Version</router-link>
		</div>
	</div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
	name: "HomePage",

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
