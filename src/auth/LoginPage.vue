<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-center">
        <h4 class="text-muted mb-4">Login</h4>

        <AlertComponent id="sharedMessage" v-if="isSharedMessageVisible" :message="getSharedMessage()"
                        :messageType="getSharedMessageType()"/>
        <AlertListComponent :alerts="alerts"/>

        <form @submit.prevent="onSubmitForm" style="width: fit-content;">
            <div class="mb-4">
                <label for="usernameOrEmail" class="form-label">Username or email</label>
                <div class="d-flex justify-content-between align-items-center">
                    <input type="text" class="form-control me-1" id="usernameOrEmail" v-model="usernameOrEmail"
                           placeholder="Enter username/email" required>
                    <TooltipComponent :text="getTooltipText('usernameOrEmail')"/>
                </div>
            </div>

            <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <div class="d-flex justify-content-between align-items-center">
                    <input type="password" class="form-control me-1" id="password" v-model="password"
                           placeholder="Enter password" required>
                    <TooltipComponent :text="getTooltipText('password')"/>
                </div>
            </div>

            <button @click.prevent="onClearForm" class="btn btn-outline-secondary mt-4 me-2">Clear</button>
            <button type="submit" class="btn btn-secondary mt-4">Login</button>
        </form>
    </div>
</template>

<script>
import {useMeta} from "vue-meta";
import {StringUtil} from "@/shared/util/StringUtil";
import {ExceptionUtil} from "@/shared/util/ExceptionUtil";
import {AlertMessageShared} from "@/shared/util/AlertMessageShared";
import {TooltipUser} from "@/user/misc/TooltipUser";
import AlertComponent from "@/shared/components/AlertComponent.vue";
import AlertListComponent from "@/shared/components/AlertListComponent.vue";
import TooltipComponent from "@/shared/components/TooltipComponent.vue";
import {UrlAuth} from "@/auth/misc/UrlAuth";

export default {
    name: "LoginPage",

    components: {
        AlertComponent,
        AlertListComponent,
        TooltipComponent
    },

    setup() {
        useMeta({
            title: "Login",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            usernameOrEmail: null,
            password: null,

            alerts: []
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/login");
    },

    methods: {
        async onSubmitForm() {
            if (this.isSharedMessageVisible()) {
                this.$store.commit("setSharedMessage", null);
                this.$store.commit("setSharedMessageType", null);
            }

            const loginRequestDto = {
                usernameOrEmail: StringUtil.getStringOrNull(this.usernameOrEmail),
                password: StringUtil.getStringOrNull(this.password)
            };

            const response = await this.login(loginRequestDto);
            if (response.status === 200) {
                this.setToken(response.body["token"]);
                this.$store.commit("setLogged", true);

                if (this.$store.state.previousUrl === null || this.$store.state.previousUrl === "" ||
                    this.$store.state.previousUrl === "/login" || this.$store.state.previousUrl === "/signup") {
                    await this.$router.push("/workouts-list");
                } else {
                    await this.$router.push(this.$store.state.previousUrl);
                }
            } else {
                this.alerts = ExceptionUtil.buildAlertsList(response.body, AlertMessageShared.WARNING);
            }
        },

        setToken(token) {
            localStorage.setItem("token", JSON.stringify(token).slice(1, -1));
        },

        onClearForm() {
            this.usernameOrEmail = null;
            this.password = null;
            this.alerts = null;
            this.$store.commit("setSharedMessage", null);
            this.$store.commit("setSharedMessageType", null);
        },

        isSharedMessageVisible() {
            return this.$store.state.sharedMessage !== null;
        },

        getSharedMessage() {
            if (this.isSharedMessageVisible()) {
                return this.$store.state.sharedMessage;
            }
            return null;
        },

        getSharedMessageType() {
            if (this.isSharedMessageVisible()) {
                return this.$store.state.sharedMessageType;
            }
            return null;
        },

        getTooltipText(fieldName) {
            if (fieldName === "usernameOrEmail") {
                return TooltipUser.USERNAME_OR_EMAIL_TOOLTIP;
            }
            if (fieldName === "password") {
                return TooltipUser.PASSWORD_TOOLTIP;
            }
        },

        async login(requestBody) {
            const res = await fetch(UrlAuth.LOGIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
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
