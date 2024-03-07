<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div>
            <BreadcrumbWorkoutsComponent/>
            <AlertListComponent :alerts="alerts"/>
            <AlertComponent :message="message" :messageType="messageType"/>
        </div>

        <h4 class="mb-4 text-muted">Create Media</h4>

        <form @submit.prevent="onSubmitForm" class="form-width">
            <div class="mb-4">
                <label for="name" class="form-label">Title<span class="span-color"> *</span></label>
                <div class="d-flex align-items-center mb-2 me-3">
                    <input type="text" class="form-control me-1" id="name" v-model="formName"
                           placeholder="Enter title" required>
                    <TooltipComponent :text="getTooltipText('title')"/>
                </div>
            </div>

            <div class="mb-4">
                <label for="description" class="form-label">Description</label>
                <div class="d-flex align-items-center mb-2 me-3">
                    <textarea rows="3" class="form-control me-1" id="description" v-model="formDescription"
                              placeholder="Enter description (optional)"></textarea>
                    <TooltipComponent :text="getTooltipText('description')"/>
                </div>
            </div>

            <div class="mb-4">
                <label for="ref" class="form-label">Http reference<span class="span-color"> *</span></label>
                <div class="d-flex align-items-center mb-2 me-3">
                    <input type="text" class="form-control me-1" id="ref" v-model="formRef"
                           placeholder="https://domain.com" required>
                    <TooltipComponent :text="getTooltipText('ref')"/>
                </div>
            </div>

            <div>
                <span class="span-color">* </span><i>Required fields</i>
            </div>

            <button @click.prevent="onClearForm" class="btn btn-outline-secondary mt-4 me-2">Clear</button>
            <button type="submit" class="btn btn-secondary mt-4">Create</button>
        </form>
    </div>
</template>

<script>
import {useMeta} from "vue-meta";
import {AuthUtil} from "@/auth/misc/AuthUtil";
import {ExceptionUtil} from "@/shared/util/ExceptionUtil";
import {StringUtil} from "@/shared/util/StringUtil";
import {UrlWorkout} from "@/activity/workout/misc/UrlWorkout";
import {AlertMessageShared} from "@/shared/util/AlertMessageShared";
import {TooltipShared} from "@/shared/util/TooltipShared";
import AlertComponent from "@/shared/components/AlertComponent.vue";
import AlertListComponent from "@/shared/components/AlertListComponent.vue";
import BreadcrumbWorkoutsComponent from "./components/BreadcrumbWorkoutsComponent.vue";
import TooltipComponent from "@/shared/components/TooltipComponent.vue";

export default {
    name: "MediaCreatePage",

    components: {
        AlertComponent,
        AlertListComponent,
        BreadcrumbWorkoutsComponent,
        TooltipComponent
    },

    setup() {
        useMeta({
            title: "Create Media",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            formName: null,
            formDescription: null,
            formRef: null,

            message: null,
            messageType: null,
            alerts: []
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-create-media");
        const token = await AuthUtil.getAndValidateToken(this);

        if (!token) {
            AuthUtil.redirectToLoginCreateNewEntity(this);
        } else {
            this.$store.commit("setLogged", true);
        }
    },

    methods: {
        async onSubmitForm() {
            const requestDto = {
                name: StringUtil.getStringOrNull(this.formName),
                description: StringUtil.getStringOrNull(this.formDescription),
                ref: StringUtil.getStringOrNull(this.formRef)
            };

            const response = await this.createHttpRef(requestDto);
            if (response.status === 201) {
                this.onClearForm();
                this.messageType = AlertMessageShared.SUCCESS;
                this.message = AlertMessageShared.CREATED_SUCCESSFULLY;
            } else if (response.status === 401) {
                AuthUtil.on401(this);
            } else {
                this.message = null;
                this.messageType = null;
                this.alerts = ExceptionUtil.buildAlertsList(response.body, AlertMessageShared.WARNING);
            }
        },

        onClearForm() {
            this.formName = null;
            this.formDescription = null;
            this.formRef = null;
            this.message = null;
            this.messageType = null;
            this.alerts = [];
        },

        getTooltipText(fieldName) {
            if (fieldName === "title") {
                return TooltipShared.TITLE_TOOLTIP;
            }
            if (fieldName === "description") {
                return TooltipShared.DESCRIPTION_TOOLTIP;
            }
            if (fieldName === "ref") {
                return TooltipShared.WEB_LINK;
            }
        },

        async createHttpRef(requestBody) {
            let token = AuthUtil.getToken();
            const response = await fetch(UrlWorkout.HTTP_REFS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();
            return {
                status: response.status,
                body: data
            };
        }
    }
};
</script>
