<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div>
            <BreadcrumbWorkoutsComponent />
            <AlertComponent :message="message" :messageType="messageType" /><br>
            <ButtonComponent link="/workouts-create-media" title="New Media" />
            <br><br>
        </div>

        <!-- Custom Media -->
        <h6 v-if="customMedia && customMedia.length > 0" class="text-secondary mt-3 mb-4">Custom Media</h6>

        <div v-if="customMedia && customMedia.length > 0" class="d-flex flex-column w-100">

            <div v-for="elt in customMedia" :key="elt.id">
                <MediaComponent :id="elt.id" :name="elt.name" :description="elt.description" :isCustom="elt.isCustom"
                    :httpRef="elt.ref" />
            </div>

        </div>

        <!-- Default Media -->
        <h6 v-if="defaultMedia" class="text-secondary mt-3 mb-4">Default Media</h6>

        <div v-if="defaultMedia" class="d-flex flex-column w-100">

            <div v-for="elt in defaultMedia" :key="elt.id">
                <MediaComponent :id="elt.id" :name="elt.name" :description="elt.description" :isCustom="elt.isCustom"
                    :httpRef="elt.ref" />
            </div>

        </div>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { getToken } from "../../shared/js/common.js";
import { getAndValidateToken } from "../../shared/js/common.js";
import MediaComponent from "../components/MediaComponent.vue";
import BreadcrumbWorkoutsComponent from "../components/BreadcrumbWorkoutsComponent.vue";
import AlertComponent from "../../shared/components/AlertComponent.vue";
import ButtonComponent from "../../shared/components/ButtonComponent.vue";

export default {
    name: "MediasListPage",

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
        AlertComponent,
        ButtonComponent
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-media-list");

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
