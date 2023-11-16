<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-center">

        <AlertComponent :message="message" :messageType="messageType" />

        <h4 v-if="!isDeleted" class="mb-4">Update Media</h4>
        <form v-if="!isDeleted" class="mb-5" @submit.prevent="submitForm" style="width: fit-content;">
            <div class="mb-4">
                <label for="name" class="form-label">{{ this.nameLabel }}</label>
                <input type="text" class="form-control" id="name" v-model="name" placeholder="New Media">
            </div>

            <div class="mb-4">
                <label for="description" class="form-label">{{ this.descriptionLabel ? this.descriptionLabel : "Description" }}</label>
                <input type="text" class="form-control" id="description" v-model="description" placeholder="New Description">
            </div>

            <div class="mb-4">
                <label for="ref" class="form-label">Http Reference</label>
                <input type="text" class="form-control" id="ref" v-model="ref" placeholder="https://new.com">
            </div>

            <button type="submit" class="btn btn-secondary mt-4">Update</button>
        </form>

        <h4 v-if="!isDeleted" class="mb-2">Delete</h4>
        <form v-if="!isDeleted" @submit.prevent="submitFormDelete" style="min-width: 13rem; width: fit-content;"
            class="mb-5">
            <button type="submit" class="btn btn-warning mt-4">Delete</button>
        </form>
        <br>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { getToken } from "../../shared/js/common.js";
import { getAndValidateToken } from "../../shared/js/common.js";
import AlertComponent from "../../shared/components/AlertComponent.vue";

export default {
    name: "ManageMediaPage",

    setup() {
        useMeta({
            title: "Healthy - Manage Media",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            nameLabel: "",
            descriptionLabel: "",
            name: null,
            description: null,
            ref: null,
            message: "",
            messageType: "",
            isDeleted: false
        };
    },

    components: {
        AlertComponent
    },

    async created() {
        this.$store.commit("setCurrentUrl", `/workouts-manage-media/${this.$route.params.id}`);

        const token = await getAndValidateToken();

        if (!token) {
            this.$store.commit("setLogged", false);
            this.$router.push("/login");
        } else {
            this.$store.commit("setLogged", true);
            await this.getMediaDetails(this.$route.params.id);
        }
    },

    methods: {
        async submitForm() {
            const requestDto = {
                updatedName: this.name,
                updatedDescription: this.description,
                updatedRef: this.ref
            };

            try {
                const res = await this.updateMedia(requestDto);

                if (res.status === 200) {
                    this.messageType = "SUCCESS";
                    this.message = "Media has been updated successfully";

                    this.nameLabel = res.body.name;
                    this.descriptionLabel = res.body.description;
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
        },

        async submitFormDelete() {
            try {
                const res = await this.deleteMedia(this.$route.params.id);

                if (res.status === 204) {
                    this.messageType = "SUCCESS";
                    this.message = "Media has been deleted successfully";
                    this.isDeleted = true;
                } else {
                    this.messageType = "WARNING";
                    this.message = `An error occurred (${res.status})`;
                }
            } catch (error) {
                this.messageType = "WARNING";
                this.message = `An error occurred (${error})`;
            }
        },

        async getMediaDetails(id) {
            let URL = `/api/v1/workouts/httpRefs/${id}`;
            let token = getToken();

            const res = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();

            this.nameLabel = data.name;
            this.descriptionLabel = data.description;
        },

        async updateMedia(requestBody) {
            let URL = `/api/v1/workouts/httpRefs/${this.$route.params.id}`;
            let token = getToken();

            const res = await fetch(URL, {
                method: "PATCH",
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
        },

        async deleteMedia(id) {
            let URL = `/api/v1/workouts/httpRefs/${id}`;
            let token = getToken();

            const res = await fetch(URL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            return {
                status: res.status
            };
        }
    }
};
</script>
