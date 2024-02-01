<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div>
            <BreadcrumbWorkoutsComponent />
            <AlertComponent :message="message" :messageType="messageType" /><br>
        </div>

        <!-- Update Media -->
        <h4 v-if="!isDeleted" class="mb-4 text-muted">Update Media</h4>

        <form v-if="!isDeleted" class="mb-5" @submit.prevent="onSubmitUpdateForm" style="width: fit-content;">
            <div class="mb-4">
                <label for="name" class="form-label">Current title: {{ this.nameLabel }}</label>
                <input type="text" class="form-control" id="name" v-model="name" placeholder="Enter new title">
            </div>

            <div class="mb-4">
                <label for="description" class="form-label">Current description: {{ this.descriptionLabel ?
                    this.descriptionLabel : "None" }}</label>
                <textarea rows="3" class="form-control" id="description" v-model="description"
                    placeholder="Enter new description"></textarea>
            </div>

            <div class="mb-4">
                <label for="ref" class="form-label">Current media reference: {{ this.refLabel }}</label>
                <input type="text" class="form-control" id="ref" v-model="ref" placeholder="https://new-media.com">
            </div>

            <button type="submit" class="btn btn-secondary mt-2">Update</button>
        </form>

        <!-- Delete media -->
        <div v-if="!isDeleted">
            <h4 class="mb-2 text-muted">Delete Media</h4>
            <div class="mb-2">Deletion of the media reference will not affect associated workouts and exercises.</div>
            <div class="d-flex">
                <input type="checkbox" value="" class="form-check-input" id="confirmDeletion" v-model="confirmDeletion">
                <label for="confirmDeletion" class="form-check-label ms-2"><span class="span-color">Confirm deletion. This
                        action cannot be undone.</span></label>
            </div>

            <form @submit.prevent="onSubmitDeleteForm" style="min-width: 13rem; width: fit-content;" class="mb-5">
                <button :disabled="!confirmDeletion" type="submit" class="btn btn-warning mt-4">Delete</button>
            </form>
            <br>
        </div>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { getToken } from "../../shared/js/auth.js";
import { getAndValidateToken } from "../../shared/js/auth.js";
import { HTTP_REFS_SLASH } from "../../shared/URL.js";
import { SUCCESS, WARNING, MEDIA_UPDATED_SUCCESSFULLY, MEDIA_DELETED_SUCCESSFULLY } from "../../shared/MESSAGE.js";
import AlertComponent from "../../shared/components/AlertComponent.vue";
import BreadcrumbWorkoutsComponent from "../components/BreadcrumbWorkoutsComponent.vue";

export default {
    name: "MediaManagePage",

    setup() {
        useMeta({
            title: "Manage Media",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            nameLabel: "",
            descriptionLabel: "",
            refLabel: "",
            name: null,
            description: null,
            ref: null,
            message: "",
            messageType: "",
            isDeleted: false,
            confirmDeletion: false
        };
    },

    components: {
        AlertComponent,
        BreadcrumbWorkoutsComponent
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
        async onSubmitUpdateForm() {
            const requestDto = {
                name: this.name,
                description: this.description,
                ref: this.ref
            };

            try {
                const res = await this.updateMedia(requestDto);

                if (res.status === 200) {
                    this.messageType = SUCCESS;
                    this.message = MEDIA_UPDATED_SUCCESSFULLY;
                    this.nameLabel = res.body.name;
                    this.descriptionLabel = res.body.description;
                    this.refLabel = res.body.ref;
                    this.name = null;
                    this.description = null;
                    this.ref = null;
                } else {
                    let messageBuilder = "";
                    for (const key in res.body) {
                        messageBuilder += `${key}: ${res.body[key]}. `;
                    }
                    this.messageType = WARNING;
                    this.message = messageBuilder;
                }
            } catch (error) {
                this.messageType = WARNING;
                this.message = `Error: ${error}`;
            }
        },

        async onSubmitDeleteForm() {
            try {
                const res = await this.deleteMedia(this.$route.params.id);

                if (res.status === 204) {
                    this.messageType = SUCCESS;
                    this.message = MEDIA_DELETED_SUCCESSFULLY;
                    this.isDeleted = true;
                } else {
                    this.messageType = WARNING;
                    this.message = "Error occured";
                }
            } catch (error) {
                this.messageType = WARNING;
                this.message = `Error: ${error}`;
            }
        },

        async getMediaDetails(id) {
            let URL = HTTP_REFS_SLASH + id;
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
            this.refLabel = data.ref;
        },

        async updateMedia(requestBody) {
            let URL = HTTP_REFS_SLASH + this.$route.params.id;
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
            let URL = HTTP_REFS_SLASH + id;
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
