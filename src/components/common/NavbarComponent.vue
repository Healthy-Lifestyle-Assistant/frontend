<template>
    <nav class="navbar navbar-expand-lg bg-primary mb-5" data-bs-theme="dark">

        <div class="container-fluid">
            <!-- Logo -->
            <router-link to="/" class="navbar-brand me-4">Healthy Lifestyle</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Menu -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                    <li class="nav-item">
                        <router-link to="/calendar"
                            :class="{ 'nav-link': true, 'active': isCalendar }">Calendar</router-link>
                    </li>

                    <li class="nav-item dropdown">
                        <a :class="{ 'nav-link': true, 'dropdown-toggle': true, 'active': isWorkouts }" href=""
                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
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

                    <li class="nav-item">
                        <router-link to="/nutrition"
                            :class="{ 'nav-link': true, 'active': isNutrition }">Nutrition</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/meditations"
                            :class="{ 'nav-link': true, 'active': isMeditations }">Meditations</router-link>
                    </li>
                </ul>

                <!-- Most Right -->
                <div v-if="isLogged" class="d-flex align-items-center">
                    <!-- <div class="me-2">isLogged: {{ isLogged }}</div>
                    <div class="me-2">currentUrl: {{ getCurrentUrl }}</div>
                    <div class="me-2">previousUrl: {{ getPreviousUrl }}</div> -->

                    <router-link to="/settings-menu" class="btn btn-light me-2" role="button">Settings</router-link>
                    <router-link to="/logout" class="btn btn-light me-2" role="button">Logout</router-link>
                </div>

                <div v-else class="d-flex align-items-center">
                    <!-- <div class="me-2">isLogged: {{ isLogged }} </div>
                    <div class="me-2">currentUrl: {{ getCurrentUrl }}</div>
                    <div class="me-2">previousUrl: {{ getPreviousUrl }}</div> -->

                    <router-link to="/login" class="btn btn-light me-2" role="button">Login</router-link>
                    <router-link to="/signup" class="btn btn-light me-2" role="button">Sign-Up</router-link>
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
