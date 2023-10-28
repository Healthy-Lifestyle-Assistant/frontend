<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div>
            <BreadcrumbWorkoutsComponent />
            <br>
            <router-link to="/workouts-media" class="btn btn-primary me-4" role="button">New Media</router-link>
            <br><br>
        </div>

        <div v-if="elements" class="d-flex flex-wrap">

            <div v-for="elt in elements" :key="elt.id">
                <MediaComponent :name="elt.name" :description="elt.description" :isCustom="elt.custom" :httpRef="elt.ref" />
            </div>

        </div>
    </div>

    <p v-if="message" :class="{ 'success-message': isSuccess, 'error-message': isError }">
        {{ message }}
    </p>
</template>

<script>
import { useMeta } from "vue-meta";
import MediaComponent from "../../components/workouts/MediaComponent.vue";
import BreadcrumbWorkoutsComponent from "../../components/workouts/BreadcrumbWorkoutsComponent.vue"

export default {
    name: "MediaPage",

    setup() {
        useMeta({
            title: "Healthy - Media",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            elements: null,
            message: ""
        };
    },

    components: {
        MediaComponent,
        BreadcrumbWorkoutsComponent
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-media");

        const isTokenValid = await this.validateToken();

        if (isTokenValid) {
            this.$store.commit("setLogged", true);
            // 
        } else {
            try {
                this.$store.commit("setLogged", false);

                const res = await this.getDefaultHttpRefs();

                if (res.status === 200) {
                    this.elements = res.body;
                }
                else if (res.status === 401) {
                    this.$router.push("/login");
                }
                else {
                    this.message = `Unexpected response status (${res.status})`;
                }
            } catch (error) {
                this.message = "An error occurred while signing up. Try again";
            }
        }
    },

    computed: {
        isSuccess() {
            return this.message.includes("success");
        },

        isError() {
            return this.message.includes("error");
        }
    },

    methods: {
        async validateToken() {
            const token = localStorage.getItem("token");

            if (token === null || token === "") {
                return false;
            } else {
                // GET /api/v1/auth/validate
                return false;
            }
        },

        async getDefaultHttpRefs() {
            let URL = "/api/v1/workouts/httpRefs/default";

            const res = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            return {
                status: res.status,
                body: data
            };
        }
    }
};
</script>

<style>
.success-message {
    color: green;
}

.error-message {
    color: red;
}
</style>
