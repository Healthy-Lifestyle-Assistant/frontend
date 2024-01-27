<template>
    <nav class="navbar fixed-top navbar-expand-lg bg-light mb-5" data-bs-theme="light">

        <div class="container-fluid">
            <!-- Logo -->
            <router-link to="/" class="navbar-brand me-5">
                <img src="../../assets/logo.png" alt="Logo" class="d-inline-block align-text-top logo-custom-size">
                Healthy Life
            </router-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Menu -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                    <!-- Workouts Dropdown -->
                    <!-- <li class="nav-item dropdown me-3">
                        <a :class="{ 'nav-link': true, 'dropdown-toggle': true, 'active': isWorkouts }" href=""
                            role="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="true">
                            Workouts <span class="badge text-bg-success">New</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="nav-item">
                                <a href="/workouts" class="dropdown-item">Workouts</a>
                            </li>
                            <li class="nav-item">
                                <a href="/workouts-exercises" class="dropdown-item">Exercises</a>
                            </li>
                            <li class="nav-item">
                                <a href="/workouts-reminders" class="dropdown-item">Reminders</a>
                            </li>
                            <li class="nav-item">
                                <a href="/workouts-media" class="dropdown-item">Media</a>
                            </li>
                        </ul>
                    </li> -->

                    <!-- <li class="nav-item me-3">
                        <router-link to="/workouts-list"
                        :class="{ 'nav-link': true, 'active': isWorkouts }">Workouts</router-link>
                    </li> -->

                    <li class="nav-item me-3">
                        <a href="/workouts-list"
                        :class="{ 'nav-link': true, 'active': isWorkouts }">Workouts</a>
                    </li>

                    <!-- <li class="nav-item me-3">
                        <router-link to="/nutrition" 
                        :class="{ 'nav-link': true, 'active': isNutrition }">Nutrition</router-link>
                    </li> -->
                    <li class="nav-item me-3">
                        <a href="/nutrition" 
                        :class="{ 'nav-link': true, 'active': isNutrition }">Nutrition</a>
                    </li>

                    <!-- <li class="nav-item me-3">
                        <router-link to="/meditations" 
                        :class="{ 'nav-link': true, 'active': isMeditations }">Meditations</router-link>
                    </li> -->
                    <li class="nav-item me-3">
                        <a href="/meditations" 
                        :class="{ 'nav-link': true, 'active': isMeditations }">Meditations</a>
                    </li>

                    <!-- <li class="nav-item me-3">
                        <router-link to="/calendar"
                        :class="{ 'nav-link': true, 'active': isCalendar }">Calendar</router-link>
                    </li> -->
                    <li class="nav-item me-3">
                        <a href="/calendar"
                        :class="{ 'nav-link': true, 'active': isCalendar }">Calendar</a>
                    </li>

                    <!-- <li class="nav-item me-3">
                        <router-link to="/stats"
                        :class="{ 'nav-link': true, 'active': isStats }">Stats</router-link>
                    </li> -->
                    <li class="nav-item me-3">
                        <a href="/stats"
                        :class="{ 'nav-link': true, 'active': isStats }">Stats</a>
                    </li>
                </ul>

                <!-- Login/Signup -->
                <div v-if="isLogged" class="d-flex align-items-center">
                    <!-- <div class="me-2">isLogged: {{ isLogged }}</div>
                    <div class="me-2">curUrl: {{ getCurrentUrl }}</div>
                    <div class="me-2">prevUrl: {{ getPreviousUrl }}</div> -->

                    <router-link to="/settings" class="btn btn-outline-secondary me-2" role="button">Settings</router-link>
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

        isWorkouts() {
            return this.$store.state.currentUrl.includes("workouts");
        },

        isNutrition() {
            return this.$store.state.currentUrl.includes("nutrition");
        },

        isMeditations() {
            return this.$store.state.currentUrl.includes("meditations");
        },

        isCalendar() {
            return this.$store.state.currentUrl.includes("calendar");
        },

        isStats() {
            return this.$store.state.currentUrl.includes("stats");
        }
    }
}
</script>
