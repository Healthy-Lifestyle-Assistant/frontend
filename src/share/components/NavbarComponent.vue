<template>
    <nav class="navbar fixed-top navbar-expand-lg bg-light mb-5" data-bs-theme="light">

        <div class="container-fluid">
            <!-- Logo -->
            <router-link to="/" class="navbar-brand me-5">
                <img src="../../assets/logo.png" alt="Logo" class="d-inline-block align-text-top logo-custom-size">
                Healthy Lifestyle
            </router-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Menu -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                    <!-- Calendar -->
                    <li class="nav-item me-3">
                        <router-link to="/calendar"
                            :class="{ 'nav-link': true, 'active': isCalendar }">Calendar</router-link>
                    </li>

                    <!-- Workouts -->
                    <li class="nav-item dropdown me-3">
                        <a :class="{ 'nav-link': true, 'dropdown-toggle': true, 'active': isWorkouts }" href=""
                            role="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="true">
                            Workouts
                        </a>
                        <ul class="dropdown-menu">
                            <li class="nav-item">
                                <router-link to="/workouts" class="dropdown-item">Workouts</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/workouts-exercises" class="dropdown-item">Exercises</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/workouts-reminders" class="dropdown-item">Reminders</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/workouts-media" class="dropdown-item">Media</router-link>
                            </li>
                        </ul>
                    </li>

                    <!-- Nutrition -->
                    <li class="nav-item me-3">
                        <router-link to="/nutrition"
                            :class="{ 'nav-link': true, 'active': isNutrition }">Nutrition</router-link>
                    </li>

                    <!-- Meditation -->
                    <li class="nav-item me-3">
                        <router-link to="/meditations"
                            :class="{ 'nav-link': true, 'active': isMeditations }">Meditations</router-link>
                    </li>
                </ul>

                <!-- Login/Signup -->
                <div v-if="isLogged" class="d-flex align-items-center">
                    <!-- <div class="me-2">isLogged: {{ isLogged }}</div>
                    <div class="me-2">curUrl: {{ getCurrentUrl }}</div>
                    <div class="me-2">prevUrl: {{ getPreviousUrl }}</div> -->

                    <router-link to="/" class="btn btn-outline-secondary me-2" role="button">Settings</router-link>
                    <router-link to="/logout" class="btn btn-outline-secondary me-2" role="button">Logout</router-link>
                </div>

                <div v-else class="d-flex align-items-center">
                    <!-- <div class="me-2">isLogged: {{ isLogged }} </div>
                    <div class="me-2">curUrl: {{ getCurrentUrl }}</div>
                    <div class="me-2">prevUrl: {{ getPreviousUrl }}</div> -->

                    <router-link to="/login" class="btn btn-outline-secondary me-2" role="button">Login</router-link>
                    <router-link to="/signup" class="btn btn-secondary me-2" role="button">Sign-Up</router-link>
                </div>

            </div>

        </div>
    </nav>
</template>

<script>
export default {
    name: "NavbarComponent",

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
