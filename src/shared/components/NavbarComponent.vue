<template>
    <nav class="navbar fixed-top navbar-expand-lg bg-light mb-5" data-bs-theme="light">

        <div class="container-fluid">
            <!-- Logo -->
            <div class="d-flex align-items-center me-5">
                <a href="/" class="navbar-brand">
                    <!-- <img src="../../assets/logo.png" alt="Logo" class="d-inline-block align-text-top logo-custom-size"> -->
                    Healthy Lifestyle
                </a>

                <img v-if="isNotificationIconVisible()" src="../../assets/notification.png" alt=""
                     style="width: 24px; height: 24px;"
                     @click="onNotificationClick">
            </div>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Menu -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                    <li class="nav-item me-3">
                        <a href="/workouts-list" :class="{ 'nav-link': true, 'active': isWorkouts }">Workout</a>
                    </li>

                    <li class="nav-item me-3">
                        <a href="/nutrition" :class="{ 'nav-link': true, 'active': isNutrition }">Nutrition</a>
                    </li>

                    <li class="nav-item me-3">
                        <a href="/meditations" :class="{ 'nav-link': true, 'active': isMeditations }">Mental
                            Activity</a>
                    </li>

                    <li class="nav-item me-3">
                        <a href="/calendar-today" :class="{ 'nav-link': true, 'active': isCalendar }">Calendar</a>
                    </li>

                    <li class="nav-item me-3">
                        <a href="/stats-today" :class="{ 'nav-link': true, 'active': isStats }">Stats</a>
                    </li>
                </ul>

                <!-- User Profile -->
                <div v-if="isLogged" class="d-flex align-items-center">
                    <div v-if="isNotificationIconVisible()" class="me-2" @click="onNotificationClick">
                        <img src="../../assets/notification.png" alt="" style="width: 24px; height: 24px;">
                    </div>

                    <div class="me-3">
                        <a :href="getCurrentUrl()" @click="onClickEN($event)" class="me-2"><b>EN</b></a>
                        <a :href="getCurrentUrl()" @click="onClickUA($event)" class="me-2"
                           style="text-decoration: none;">UA</a>
                        <a :href="getCurrentUrl()" @click="onClickRU($event)" class="me-2"
                           style="text-decoration: none;">RU</a>
                    </div>

                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Welcome, {{ getUserFullName }}!
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDarkDropdownMenuLink" style="width: 40px;">
                                <li><a class="dropdown-item" href="/settings">Profile</a></li>
                                <li><a class="dropdown-item" href="/settings">Preferences</a></li>
                                <li><a class="dropdown-item" href="/settings">Billing</a></li>
                                <li><a class="dropdown-item" href="/logout">Logout</a></li>
                            </ul>
                        </li>
                    </ul>


                </div>

                <!-- Login, Signup -->
                <div v-else class="d-flex align-items-center">
                    <div class="me-3">
                        <a :href="getCurrentUrl()" @click="onClickEN($event)" class="me-2"><b>EN</b></a>
                        <a :href="getCurrentUrl()" @click="onClickUA($event)" class="me-2"
                           style="text-decoration: none;">UA</a>
                        <a :href="getCurrentUrl()" @click="onClickRU($event)" class="me-2"
                           style="text-decoration: none;">RU</a>
                    </div>
                    <div>
                        <a href="/login" class="btn btn-outline-secondary me-2" role="button">Login</a>
                        <a href="/signup" class="btn btn-secondary me-2" role="button">Sign-Up</a>
                    </div>
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
        },

        getUserFullName() {
            let userFullName = this.$store.state.userFullName;
            if (userFullName === null || userFullName === "") {
                return "Error";
            }
            return userFullName;
        }
    },

    methods: {
        onNotificationClick() {
            alert(this.$store.state.pushNotification);
        },

        isNotificationIconVisible() {
            return this.$store.state.pushNotification !== null;
        },

        onClickEN(event) {
            event.preventDefault();
            alert("English is already selected");
        },

        onClickUA(event) {
            event.preventDefault();
            alert("Зараз доступна тільки англійська");
        },

        onClickRU(event) {
            event.preventDefault();
            alert("Сейчас доступен только английский");
        },

        getCurrentUrl() {
            return this.$store.state.currentUrl;
        }
    }
}
</script>
