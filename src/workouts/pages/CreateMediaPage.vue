<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-center">
        <h4 class="mb-4">Create Media</h4>

        <AlertComponent :message="message" :messageType="messageType" />

        <form @submit.prevent="submitForm" style="width: fit-content;">
            <div class="mb-4">
                <label for="name" class="form-label">Name<span style="color: red;">*</span></label>
                <input type="text" class="form-control" id="name" v-model="name" placeholder="My Media" required>
            </div>

            <div class="mb-4">
                <label for="description" class="form-label">Description</label>
                <input type="text" class="form-control" id="description" v-model="description" placeholder="Description">
            </div>

            <div class="mb-4">
                <label for="ref" class="form-label">Http Reference<span style="color: red;">*</span></label>
                <input type="text" class="form-control" id="ref" v-model="ref" placeholder="https://google.com" required>
            </div>

            <div>
                <span style="color: red;">*</span> Required Fields
            </div>

            <button type="submit" class="btn btn-secondary mt-4">Create</button>
        </form>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { getToken } from "../../shared/js/common.js";
import { getAndValidateToken } from "../../shared/js/common.js";
import AlertComponent from "../../shared/components/AlertComponent.vue";

export default {
    name: "CreateMediaPage",

    setup() {
        useMeta({
            title: "Healthy - Create Media",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            name: "",
            description: "",
            ref: "",
            message: "",
            messageType: ""
        };
    },

    components: {
        AlertComponent
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-create-media");

        const token = await getAndValidateToken();

        if (!token) {
            this.$store.commit("setLogged", false);
            this.$router.push("/login");
        } else {
            this.$store.commit("setLogged", true);
        }
    },

    methods: {
        async submitForm() {
            const requestDto = {
                name: this.name,
                description: this.description,
                ref: this.ref
            };

            try {
                const res = await this.createMedia(requestDto);

                if (res.status === 201) {
                    this.messageType = "SUCCESS";
                    this.message = "Media has been created successfully";
                } else {
                    let messageBuilder = "";
                    for (const key in res.body) {
                        messageBuilder += `${key}: ${res.body[key]}. `;
                    }
                    this.messageType = "WARNING";
                    this.message = `An error occured (${messageBuilder}Status ${res.status})`;
                }
            } catch (error) {
                this.messageType = "WARNING";
                this.message = `An error occurred (${error})`;
            }

            this.name = "";
            this.description = "";
            this.ref = "";
        },

        async createMedia(requestBody) {
            let URL = "/api/v1/workouts/httpRefs";
            let token = getToken();

            const res = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
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
