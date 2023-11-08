<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <AlertComponent :message="message" :messageType="messageType" />
        <!-- <AlertComponent :isUnlogged="isUnlogged" :isError="isError" :message="message" /> -->

        <div>
            <BreadcrumbWorkoutsComponent />
            <br>
            <router-link to="/workouts-create-media" class="btn btn-outline-secondary me-4" role="button">New
                Media</router-link>
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
import { getToken } from "../common/common.js";

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
            message: "",
            messageType: "",
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

        // Retrieve Default Media
        try {
            const res = await this.getDefaultMedia();

            if (res.status === 200) {
                this.defaultMedia = res.body;
            }
            else {
                this.messageType = "WARNING";
                this.message = `An error occured (${res.body.message} ${res.status})`;
            }
        } catch (error) {
            this.messageType = "WARNING";
            this.message = `An error occurred (${error})`;
        }

        // Retrieve Custom Media
        if (!token) {
            this.$store.commit("setLogged", false);
            this.messageType = "SECONDARY";
            this.message = "You are unlogged";
        } else {
            this.$store.commit("setLogged", true);

            try {
                const res = await this.getCustomMedia(token);

                if (res.status === 200) {
                    this.customMedia = res.body;

                    if (Array.isArray(res.body) && res.body.length === 0) {
                        this.messageType = "SECONDARY";
                        this.message = "No Custom Media Found";
                    }
                }
                else if (res.status === 401) {
                    this.$router.push("/login");
                }
                else {
                    this.messageType = "WARNING";
                    this.message = `An error occured (${res.body.message} ${res.status})`;
                }
            } catch (error) {
                this.messageType = "WARNING";
                this.message = `An error occurred (${error})`;
            }
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
        },

        async getCustomMedia() {
            let URL = "/api/v1/workouts/httpRefs";
            let token = getToken();

            const res = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
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
