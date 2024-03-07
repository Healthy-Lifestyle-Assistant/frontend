<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-center">
        <h4 class="text-muted mb-4">Register</h4>

        <AlertComponent id="sharedMessage" v-if="isSharedMessageVisible" :message="getSharedMessage()"
                        :messageType="getSharedMessageType()"/>
        <AlertListComponent :alerts="alerts"/>

        <form @submit.prevent="onSubmitForm" class="mb-5" style="width: fit-content;">
            <div class="mb-4">
                <label for="username" class="form-label">Username<span class="span-color"> *</span></label>
                <div class="d-flex justify-content-between align-items-center">
                    <input type="text" class="form-control me-1" id="username" v-model="formUsername"
                           placeholder="Enter username" required>
                    <TooltipComponent :text="getTooltipText('username')"/>
                </div>
            </div>

            <div class="mb-4">
                <label for="email" class="form-label">Email<span class="span-color"> *</span></label>
                <div class="d-flex justify-content-between align-items-center">
                    <input type="email" class="form-control me-1" id="email" v-model="formEmail"
                           placeholder="Enter email"
                           required>
                    <TooltipComponent :text="getTooltipText('email')"/>
                </div>
            </div>

            <div class="mb-4">
                <label for="fullName" class="form-label">Full Name<span class="span-color"> *</span></label>
                <div class="d-flex justify-content-between align-items-center">
                    <input type="text" class="form-control me-1" id="fullName" v-model="formFullName"
                           placeholder="Enter full name" required>
                    <TooltipComponent :text="getTooltipText('fullName')"/>
                </div>
            </div>

            <div v-if="countries && countries.length > 0" class="mb-4">
                <label for="countries" class="form-label">Country<span class="span-color"> *</span></label>
                <div class="d-flex justify-content-between align-items-center">
                    <select id="countries" v-model="formCountryId" class="form-select me-1" aria-label="Select Country"
                            required>
                        <option :value="null" disabled>Select country</option>
                        <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.name }}
                        </option>
                    </select>
                    <TooltipComponent :text="getTooltipText('country')"/>
                </div>
            </div>

            <div class="mb-4">
                <label for="age" class="form-label">Age</label>
                <div class="d-flex justify-content-between align-items-center">
                    <input type="number" min="16" max="120" step="1" class="form-control me-1" id="age"
                           v-model="formAge"
                           placeholder="Enter age (optional)">
                    <TooltipComponent :text="getTooltipText('age')"/>
                </div>
            </div>

            <div class="mb-4">
                <label for="password" class="form-label">Password<span class="span-color"> *</span></label>
                <div class="d-flex justify-content-between align-items-center">
                    <input type="password" class="form-control me-1" id="password" v-model="formPassword"
                           placeholder="Enter password" required>
                    <TooltipComponent :text="getTooltipText('password')"/>
                </div>
            </div>

            <div class="mb-4">
                <label for="confirmPassword" class="form-label">Confirm Password<span
                    class="span-color"> *</span></label>
                <div class="d-flex justify-content-between align-items-center">
                    <input type="password" class="form-control me-1" id="confirmPassword" v-model="formConfirmPassword"
                           placeholder="Confirm password" required>
                    <TooltipComponent :text="getTooltipText('password')"/>
                </div>
            </div>

            <div>
                <span class="span-color">*</span> <i>Required fields</i>
            </div>

            <button @click.prevent="onClearForm" class="btn btn-outline-secondary mt-4 me-2">Clear</button>
            <button id="signupButton" type="submit" class="btn btn-secondary mt-4">Sign Up</button>
            <br><br>
        </form>
    </div>
</template>

<script>
import {useMeta} from "vue-meta";
import {StringUtil} from "@/shared/util/StringUtil";
import {ExceptionUtil} from "@/shared/util/ExceptionUtil";
import {UrlUser} from "@/user/misc/UrlUser";
import {AlertMessageShared} from "@/shared/util/AlertMessageShared";
import {AlertMessageUser} from "@/user/misc/AlertMessageUser";
import {TooltipUser} from "@/user/misc/TooltipUser";
import AlertComponent from "@/shared/components/AlertComponent.vue";
import AlertListComponent from "@/shared/components/AlertListComponent.vue";
import TooltipComponent from "@/shared/components/TooltipComponent.vue";

export default {
    name: "UserSignupPage",

    components: {
        AlertComponent,
        AlertListComponent,
        TooltipComponent
    },

    setup() {
        useMeta({
            title: "Signup",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            formUsername: null,
            formEmail: null,
            formFullName: null,
            formPassword: null,
            formConfirmPassword: null,
            formCountryId: null,
            formAge: null,

            countries: [],

            alerts: []
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/signup");
        let countriesResponse = await this.getCountries();

        if (countriesResponse.status === 200) {
            this.countries = countriesResponse.body;
        } else {
            this.alerts = ExceptionUtil.buildAlertsList(
                countriesResponse.body, AlertMessageShared.WARNING);
        }
    },

    methods: {
        async onSubmitForm() {
            if (this.isSharedMessageVisible()) {
                this.$store.commit("setSharedMessage", null);
                this.$store.commit("setSharedMessageType", null);
            }

            if (this.formCountryId === null || this.formCountryId === 0) {
                alert(AlertMessageUser.COUNTRY_SHOULD_BE_SELECTED);
            } else {
                const requestDto = {
                    username: StringUtil.getStringOrNull(this.formUsername),
                    email: StringUtil.getStringOrNull(this.formEmail),
                    fullName: StringUtil.getStringOrNull(this.formFullName),
                    password: StringUtil.getStringOrNull(this.formPassword),
                    confirmPassword: StringUtil.getStringOrNull(this.formConfirmPassword),
                    countryId: this.formCountryId,
                    age: this.formAge,
                };

                const response = await this.signup(requestDto);
                if (response.status === 201) {
                    this.$store.commit("setSharedMessageType", AlertMessageShared.SUCCESS);
                    this.$store.commit("setSharedMessage", AlertMessageUser.SIGNUP_SUCCESSFUL);
                    await this.$router.push("/login");
                } else {
                    this.alerts = ExceptionUtil.buildAlertsList(
                        response.body, AlertMessageShared.WARNING);
                }
            }
        },

        onClearForm() {
            this.formUsername = null;
            this.formEmail = null;
            this.formFullName = null;
            this.formPassword = null;
            this.formConfirmPassword = null;
            this.formCountryId = null;
            this.formAge = null;
            this.alerts = [];
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
            if (fieldName === "username") {
                return TooltipUser.USERNAME_TOOLTIP;
            }
            if (fieldName === "email") {
                return TooltipUser.EMAIL_TOOLTIP;
            }
            if (fieldName === "fullName") {
                return TooltipUser.FULL_NAME_TOOLTIP;
            }
            if (fieldName === "age") {
                return TooltipUser.AGE_TOOLTIP;
            }
            if (fieldName === "country") {
                return TooltipUser.COUNTRY_TOOLTIP;
            }
            if (fieldName === "password") {
                return TooltipUser.PASSWORD_TOOLTIP;
            }
        },

        async signup(requestDto) {
            const response = await fetch(UrlUser.USERS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestDto)
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                return {
                    status: response.status,
                    body: data
                };
            } else {
                return {
                    status: response.status,
                    body: null
                };
            }
        },

        async getCountries() {
            const response = await fetch(UrlUser.COUNTRIES, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
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
