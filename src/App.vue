<template>
	<nav class="navbar navbar-expand-lg bg-dark mb-5" data-bs-theme="dark">

		<div class="container-fluid">
			<!-- Most Left Side -->
			<router-link to="/" class="navbar-brand me-4">Healthy Lifestyle</router-link>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<!-- End of Most Left Side -->

			<!-- Menu -->
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">

					<li class="nav-item">
						<router-link to="/calendar-menu"
							:class="{ 'nav-link': true, 'active': isCalendar }">Calendar</router-link>
					</li>

					<li class="nav-item">
						<router-link to="/workouts-start-page"
							:class="{ 'nav-link': true, 'active': isWorkouts }">Workouts</router-link>
					</li>

					<li class="nav-item">
						<router-link to="/nutrition-menu"
							:class="{ 'nav-link': true, 'active': isNutrition }">Nutrition</router-link>
					</li>

					<li class="nav-item">
						<router-link to="/meditations-menu"
							:class="{ 'nav-link': true, 'active': isMeditations }">Meditations</router-link>
					</li>
				</ul>
				<!-- End of Menu -->

				<!-- Most right side -->
				<div v-if="isLogged" class="d-flex align-items-center">
					<!-- <div class="me-2">isLogged: {{ isLogged }}</div> -->
					<!-- <div class="me-2">currentUrl: {{ getCurrentUrl }}</div> -->
					<!-- <div class="me-2">previousUrl: {{ getPreviousUrl }}</div> -->
					<router-link to="/settings-menu" class="btn btn-outline-info me-2"
						role="button">Settings</router-link>
					<router-link to="/logout" class="btn btn-outline-info me-2" role="button">Logout</router-link>
				</div>

				<div v-else class="d-flex align-items-center">
					<!-- <div class="me-2">isLogged: {{ isLogged }} </div> -->
					<!-- <div class="me-2">currentUrl: {{ getCurrentUrl }}</div> -->
					<!-- <div class="me-2">previousUrl: {{ getPreviousUrl }}</div> -->
					<router-link to="/login" class="btn btn-outline-info me-2" role="button">Login</router-link>
					<router-link to="/signup" class="btn btn-outline-info me-2" role="button">Sign-Up</router-link>
				</div>
				<!-- End of Most right side -->

			</div> <!-- </div class="collapse navbar-collapse" id="navbarSupportedContent"> -->

		</div><!-- </div class="container-fluid"> -->
	</nav>

	<!-- Render App Content -->
	<div class="container d-flex flex-column align-items-center justify-content-center">
		<router-view></router-view>
	</div>
	<!-- End of App content -->

	<!-- Footer -->
</template>

<script>
export default {
	name: "App",

	computed: {
		isLogged() {
			return this.$store.state.isLogged;
		},

		getCurrentUrl() {
			return this.$store.state.currentUrl;
		},

		getPreviousUrl() {
			return this.$store.state.previousUrl;
		},

		isCalendar() {
			return this.$store.state.currentUrl.includes("calendar");
		},

		isWorkouts() {
			return this.$store.state.currentUrl.includes("workouts");
		},

		isNutrition() {
			return this.$store.state.currentUrl.includes("nutrition");
		},

		isMeditations() {
			return this.$store.state.currentUrl.includes("meditations");
		}
	}
}
</script>

<style></style>
