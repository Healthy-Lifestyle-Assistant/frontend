<template>
	<metainfo>
		<template v-slot:title="{ content }">{{ content }}</template>
	</metainfo>

	<div class="d-flex flex-column" style="width: 90%;">
		<h2 class="mt-3 mb-5">Enhance Your Health and Wellbeing</h2>

		<p class="lead">
			Healthy Lifestyle Assistant is a startup promoting a healthy lifestyle using digital
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

		<!-- Contact -->
		<p class="lead mt-3">
			<b>Contact Us</b><br>
			<a href="https://www.linkedin.com/in/olegkdev/" class="me-5" style="text-decoration: none; color: #343a40;">
				LinkedIn
				<img src="../../assets/linkedin-icon.svg" alt="" width="20" height="20" class="d-inline-block">
			</a><br>

			Email: <span>office@healthy-lifestyle-assistant.com</span>
		</p>

		<!-- Organization -->
		<p class="lead mt-3">
			<b>Organization</b><br>
			<a href="https://www.linkedin.com/company/healthy-lifestyle-assistant/" class="me-5" style="text-decoration: none; color: #343a40;">
				LinkedIn
				<img src="../../assets/linkedin-icon.svg" alt="" width="20" height="20" class="d-inline-block">
			</a><br>

			<a href="https://github.com/Healthy-Lifestyle-Assistant/" class="me-5" style="text-decoration: none; color: #343a40;">
				GitHub
				<img src="../../assets/github-icon.svg" alt="" width="20" height="20" class="d-inline-block">
			</a><br>

		</p>
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
