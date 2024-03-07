<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">
        <div>
            <AlertListComponent :alerts="alerts"/>
            <AlertComponent :message="message" :messageType="messageType"/>
        </div>

        <!-- Update -->
        <h4 class="mb-4 text-muted">Update Profile</h4>
        <form class="mb-5" @submit.prevent="onSubmitUpdateForm" style="width: fit-content;">
            <div class="mb-4">
                <label for="username" class="form-label">Current username: {{ user.username }}</label>
                <div class="d-flex justify-content-between align-items-center">
                    <input type="text" class="form-control me-1" id="username" v-model="formUsername"
                           placeholder="Enter new username"/>
                    <TooltipComponent :text="getTooltipText('username')"/>
                </div>
            </div>

            <div class="mb-4">
                <label for="email" class="form-label">Current email: {{ user.email }}</label>
                <div class="d-flex justify-content-between align-items-center">
                    <input type="email" class="form-control me-1" id="email" v-model="formEmail"
                           placeholder="Enter new email"/>
                    <TooltipComponent :text="getTooltipText('email')"/>
                </div>

            </div>

            <div class="mb-4">
                <label for="fullName" class="form-label">Current full name: {{ user.fullName }}</label>
                <div class="d-flex justify-content-between align-items-center">
                    <input type="text" class="form-control me-1" id="fullName" v-model="formFullName"
                           placeholder="Enter new full name"/>
                    <TooltipComponent :text="getTooltipText('fullName')"/>
                </div>
            </div>

            <div class="mb-4">
                <label for="age" class="form-label">Current age: {{ user.age === null ? "None" : user.age }}</label>
                <div class="d-flex justify-content-between align-items-center">
                    <input type="age" class="form-control me-1" id="age" v-model="formAge" placeholder="Enter new age"/>
                    <TooltipComponent :text="getTooltipText('age')"/>
                </div>
            </div>

            <div v-if="countries && countries.length > 0" class="mb-4">
                <label for="countries" class="form-label">Current country</label>
                <div class="d-flex justify-content-between align-items-center">
                    <select id="countries" v-model="formCountryId" class="form-select me-1"
                            aria-label="Select new country"
                            required>
                        <option v-for="country in countries" :key="country.id" :value="country.id">
                            {{ country.name }}
                        </option>
                    </select>
                    <TooltipComponent :text="getTooltipText('country')"/>
                </div>
            </div>

            <div class="mb-4">
                <label for="password" class="form-label">Update password</label>
                <div class="d-flex justify-content-between align-items-center">
                    <input type="password" class="form-control me-1" id="password" v-model="formPassword"
                           placeholder="Enter new password"/>
                    <TooltipComponent :text="getTooltipText('password')"/>
                </div>
            </div>

            <div class="mb-4">
                <label for="confirmPassword" class="form-label">Confirm new password</label>
                <div class="d-flex justify-content-between align-items-center">
                    <input type="password" class="form-control me-1" id="confirmPassword" v-model="formConfirmPassword"
                           placeholder="Enter new password"/>
                    <TooltipComponent :text="getTooltipText('password')"/>
                </div>
            </div>

            <button @click.prevent="onClearForm" class="btn btn-outline-secondary mt-4 me-2">Clear</button>
            <button type="submit" class="btn btn-secondary mt-4">Update</button>
        </form>

        <!-- Delete -->
        <div>
            <h4 class="mb-2 text-muted">Delete Profile</h4>
            <div class="mb-2">Deletion of the profile will delete all user's data.</div>
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
import {useMeta} from "vue-meta";
import {AuthUtil} from "@/auth/misc/AuthUtil";
import {StringUtil} from "@/shared/util/StringUtil";
import {ExceptionUtil} from "@/shared/util/ExceptionUtil";
import {UrlUser} from "@/user/misc/UrlUser";
import {AlertMessageUser} from "@/user/misc/AlertMessageUser";
import {AlertMessageShared} from "@/shared/util/AlertMessageShared";
import {TooltipUser} from "@/user/misc/TooltipUser";
import AlertComponent from "@/shared/components/AlertComponent.vue";
import AlertListComponent from "@/shared/components/AlertListComponent.vue";
import TooltipComponent from "@/shared/components/TooltipComponent.vue";

export default {
    name: "UserManagePage",

    components: {
        AlertComponent,
        AlertListComponent,
        TooltipComponent
    },

    setup() {
        useMeta({
            title: "Settings",
            htmlAttrs: {
                lang: "en",
            },
        });
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

            user: {},
            countries: [],

            message: null,
            messageType: null,
            alerts: [],

            confirmDeletion: false
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/settings");
        const token = await AuthUtil.getAndValidateToken(this);

        if (!token) {
            AuthUtil.redirectToLoginSessionExpired(this);
        } else {
            this.$store.commit("setLogged", true);
            let countriesResponse = await this.getCountries();
            let userResponse = await this.getUserDetails(this.$route.params.id);

            if (countriesResponse.status === 200 && userResponse.status === 200) {
                this.countries = countriesResponse.body;
                this.user = userResponse.body;
                this.formCountryId = this.user.countryId;
            } else if (userResponse.status === 401) {
                AuthUtil.on401(this);
            } else {
                if (countriesResponse.status !== 200) {
                    this.alerts = this.alerts.concat(ExceptionUtil.buildAlertsList(countriesResponse.body, AlertMessageShared.WARNING));
                }
                if (userResponse.status !== 200) {
                    this.alerts = this.alerts.concat(ExceptionUtil.buildAlertsList(userResponse.body, AlertMessageShared.WARNING));
                }
            }
        }
    },

    methods: {
        async onSubmitUpdateForm() {
            const requestDto = {
                username: StringUtil.getStringOrNull(this.formUsername),
                email: StringUtil.getStringOrNull(this.formEmail),
                fullName: StringUtil.getStringOrNull(this.formFullName),
                countryId: this.formCountryId,
                age: this.formAge,
                password: StringUtil.getStringOrNull(this.formPassword),
                confirmPassword: StringUtil.getStringOrNull(this.formConfirmPassword)
            };

            const response = await this.updateUser(requestDto);
            if (response.status === 200) {
                this.user = response.body;
                this.onClearForm();
                this.messageType = AlertMessageShared.SUCCESS;
                this.message = AlertMessageUser.PROFILE_UPDATED_SUCCESSFULLY;
            } else if (response.status === 401) {
                AuthUtil.on401(this);
            } else {
                this.message = null;
                this.messageType = null;
                this.alerts = ExceptionUtil.buildAlertsList(response.body, AlertMessageShared.WARNING);
            }
        },

        async onSubmitDeleteForm() {
            const response = await this.deleteUser(this.$route.params.id);
            if (response.status === 204) {
                AuthUtil.removeToken();
                this.$store.commit("setLogged", false);
                this.$store.commit("setSharedMessageType", AlertMessageShared.SUCCESS);
                this.$store.commit("setSharedMessage", AlertMessageUser.PROFILE_DELETED_SUCCESSFULLY);
                await this.$router.push("/signup");
            } else if (response.status === 401) {
                AuthUtil.on401(this);
            } else {
                this.alerts = ExceptionUtil.buildAlertsList(response.body, AlertMessageShared.WARNING);
            }
        },

        onClearForm() {
            this.formUsername = null;
            this.formEmail = null;
            this.formFullName = null;
            this.formAge = null;
            this.formPassword = null;
            this.formConfirmPassword = null;
            this.formCountryId = this.user.countryId;
            this.message = null;
            this.messageType = null;
            this.alerts = [];
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

        async getCountries() {
            const response = await fetch(UrlUser.COUNTRIES, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            return {
                status: response.status,
                body: data,
            };
        },

        async getUserDetails() {
            let token = AuthUtil.getToken();
            const response = await fetch(UrlUser.USERS, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            return {
                status: response.status,
                body: data,
            };
        },

        async updateUser(requestBody) {
            let URL = UrlUser.USERS_SLASH + this.user.id;
            let token = AuthUtil.getToken();
            const response = await fetch(URL, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            return {
                status: response.status,
                body: data,
            };
        },

        async deleteUser() {
            let URL = UrlUser.USERS_SLASH + this.user.id;
            let token = AuthUtil.getToken();
            const response = await fetch(URL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return {
                status: response.status,
            };
        },
    },
};
</script>
