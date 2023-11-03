<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <AlertComponent :isUnlogged="isUnlogged" :isError="isError" :message="message" />

        <div>
            <BreadcrumbWorkoutsComponent />
            <br>
            <router-link to="/workouts-media" class="btn btn-outline-secondary me-4" role="button">New Media</router-link>
            <br><br>
        </div>

        <!-- Custom Media -->
        <div v-if="customMedia" class="d-flex flex-wrap">

            <div v-for="elt in customMedia" :key="elt.id">
                <MediaComponent :name="elt.name" :description="elt.description" :isCustom="elt.custom" :httpRef="elt.ref" />
            </div>

        </div>

        <!-- Default Media -->
        <div v-if="defaultMedia" class="d-flex flex-wrap">

            <div v-for="elt in defaultMedia" :key="elt.id">
                <MediaComponent :name="elt.name" :description="elt.description" :isCustom="elt.custom" :httpRef="elt.ref" />
            </div>

        </div>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import MediaComponent from "../../components/workouts/MediaComponent.vue";
import BreadcrumbWorkoutsComponent from "../../components/workouts/BreadcrumbWorkoutsComponent.vue";
import { getAndValidateToken } from "../common/common.js";
import AlertComponent from "../../components/common/AlertComponent.vue";

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
            defaultMedia: null,
            customMedia: null,
            message: ""
        };
    },

    components: {
        MediaComponent,
        BreadcrumbWorkoutsComponent,
        AlertComponent
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-media");

        const token = await getAndValidateToken();

        try {
            const res = await this.getDefaultMedia();

            if (res.status === 200) {
                this.defaultMedia = res.body;
            }
            else {
                this.message = `An error occured (${res.body.message} ${res.status})`;
            }
        } catch (error) {
            this.message = `An error occurred (${error})`;
        }

        if (!token) {
            this.$store.commit("setLogged", false);
            this.message = "You are unlogged";
        } else {
            this.$store.commit("setLogged", true);

            // Retrieve Custom Media

            // try {
            //     const res = await this.getCustomMedia(token);

            //     if (res.status === 200) {
            //         this.customMedia = res.body;
            //     }
            //     else if (res.status === 401) {
            //         this.$router.push("/login");
            //     }
            //     else {
            //         this.message = `An error occured (${res.body.message} ${res.status})`;
            //     }
            // } catch (error) {
            //     this.message = `An error occurred (${error})`;
            // }
        }
    },

    computed: {
        isError() {
            return this.message.includes("error");
        },

        isUnlogged() {
            return this.message.includes("unlogged");
        }
    },

    methods: {
        async getDefaultMedia() {
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
