<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-center">

        <h1 class="mt-2 mb-4">Enhance Your Health and Wellbeing</h1>

        <div id="carouselExampleIndicators" class="carousel slide mb-3 home-page-width" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                        aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="../assets/image-1.jpg" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="../assets/image-2.jpg" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="../assets/image-3.jpg" class="d-block w-100" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

        <div class="mb-4 home-page-width" style="font-size: large;">
            We promote a healthy lifestyle using digital technologies.
            Our web application helps people manage their workouts, nutrition, and mental activities.
        </div>

        <h4 class="mb-4">Benefits of Healthy Life</h4>

        <div class="d-flex flex-row flex-wrap justify-content-center mb-3 home-page-width">
            <HealthComponent title="Reduce Risks of Diseases" description="Not all
			diseases are preventable, but a large portion of deaths, particularly those from coronary heart disease and lung
			cancer, can be avoided."/>

            <HealthComponent title="Social Wellbeing" description="When a healthy lifestyle is adopted, a more positive model is
			provided for other people in the family, particularly children."/>

            <HealthComponent title="Longevity and Productivity"
                             description="It is not just about living longer but also about enhancing the
				quality of life and achieving more in the time we have. We can maximize our potential and become meaningful contributors to the life."/>
        </div>

        <div v-if="!isLogged" class="mb-4 mt-3">
            <router-link to="/login" class="btn btn-outline-secondary me-2" role="button">Login</router-link>
            <router-link to="/signup" class="btn btn-secondary me-2" role="button">Sign-Up</router-link>
        </div>

        <div class="mt-5">
            <h6 class="mb-3 text-muted">Business Contacts</h6>

            <div class="mb-2">
                <a href="https://www.linkedin.com/in/oleg-kucherenko/" class="me-5"
                   style="text-decoration: none; color: #343a40;">
                    LinkedIn
                    <img src="../assets/linkedin-icon.svg" alt="" width="20" height="20" class="d-inline-block">
                </a>
            </div>

            <div class="mb-2">
                Email: <span>office@healthy-lifestyle-assistant.com</span>
            </div>

            <div class="d-flex flex-row flex-wrap">
                <a href="https://www.linkedin.com/company/healthy-lifestyle-assistant/" class="me-2"
                   style="text-decoration: none; color: #343a40;">
                    Organization at LinkedIn
                    <img src="../assets/linkedin-icon.svg" alt="" width="20" height="20" class="d-inline-block">
                </a>

                <a href="https://github.com/Healthy-Lifestyle-Assistant/"
                   style="text-decoration: none; color: #343a40;">
                    GitHub
                    <img src="../assets/github-icon.svg" alt="" width="20" height="20" class="d-inline-block">
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import {useMeta} from "vue-meta";
import {AuthUtil} from "@/auth/misc/AuthUtil";
import HealthComponent from "./components/HealthComponent.vue";

export default {
    name: "HomePage",
    inject: ["messaging"],

    setup() {
        useMeta({
            title: "Healthy - Home",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    components: {
        HealthComponent
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/");
        const token = await AuthUtil.getAndValidateToken(this);
        if (!token) {
            this.$store.commit("setLogged", false);
        } else {
            this.$store.commit("setLogged", true);
            AuthUtil.getFirebaseNotificationToken(this.messaging);
        }
    },

    computed: {
        isLogged() {
            return this.$store.state.isLogged;
        }
    }
}
</script>
