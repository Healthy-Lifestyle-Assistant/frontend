<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-center">
        <h4 class="text-muted mb-4">Register</h4>

        <AlertComponent :message="message" :messageType="messageType" />

        <form @submit.prevent="submitForm" style="width: fit-content;" class="mb-5">
            <div class="mb-4">
                <label for="username" class="form-label">Username<span class="span-color"> *</span></label>
                <input type="text" class="form-control" id="username" v-model="username" placeholder="Enter username" required>
            </div>

            <div class="mb-4">
                <label for="email" class="form-label">Email<span class="span-color"> *</span></label>
                <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email"
                    required>
            </div>

            <div class="mb-4">
                <label for="fullName" class="form-label">Name<span class="span-color"> *</span></label>
                <input type="text" class="form-control" id="fullName" v-model="fullName" placeholder="Enter full name" required>
            </div>

            <div class="mb-4">
                <label for="password" class="form-label">Password<span class="span-color"> *</span></label>
                <input type="password" class="form-control" id="password" v-model="password" placeholder="Enter password"
                    required>
            </div>

            <div class="mb-4">
                <label for="confirmPassword" class="form-label">Confirm Password<span class="span-color"> *</span></label>
                <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword"
                    placeholder="Confirm password" required>
            </div>

            <div v-if="countries" class="mb-4">
                <label for="countries" class="form-label">Country<span class="span-color"> *</span></label>
                <select id="countries" v-model="countryId" class="form-select" aria-label="Select Country" required>
                    <option :value="null" disabled>Select country</option>
                    <option v-for="elt in countries" :key="elt.id" :value="elt.id">{{ elt.name }}</option>
                </select>
            </div>

            <div class="mb-4">
                <label for="age" class="form-label">Age</label>
                <input type="age" class="form-control" id="age" v-model="age" placeholder="Enter age (optional)">
            </div>

            <div>
                <span class="span-color">*</span> <i>Required fields</i>
            </div>

            <button type="submit" class="btn btn-secondary mt-4">Sign Up</button>
            <br><br>
        </form>
    </div>
</template>
  
<script>
import { useMeta } from "vue-meta";
import AlertComponent from "../../shared/components/AlertComponent.vue";

export default {
    name: "SignupPage",

    setup() {
        useMeta({
            title: "Healthy - Signup",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            username: "",
            email: "",
            fullName: "",
            password: "",
            confirmPassword: "",
            countryId: null,
            countries: null,
            age: null,
            message: "",
            messageType: ""
        };
    },

    components: {
        AlertComponent
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/signup");

        let countriesResponse = await this.getCountries();
        this.countries = countriesResponse.body;
    },

    methods: {
        async submitForm() {
            const signupRequestDto = {
                username: this.username,
                email: this.email,
                fullName: this.fullName,
                password: this.password,
                confirmPassword: this.confirmPassword,
                countryId: this.countryId,
                age: this.age,
            };

            try {
                const res = await this.signupApi(signupRequestDto);

                if (res.status === 201) {
                    this.messageType = "SUCCESS";
                    this.message = "User account has been created successfully! Now you can login to your account.";
                } else {
                    let messageBuilder = "";
					for (const key in res.body) {
						messageBuilder += `${key}: ${res.body[key]}. `;
					}
					this.messageType = "WARNING";
					this.message = `${messageBuilder}(${res.status})`;
                }
            } catch (error) {
                this.messageType = "WARNING";
                this.message = `Error: ${error}`;
            }

            this.username = "";
            this.email = "";
            this.fullName = "";
            this.password = "";
            this.confirmPassword = "";
            this.countryId = null;
            this.age = null;
        },

        async signupApi(requestBody) {
            const res = await fetch("/api/v1/users/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await res.json();
                return {
                    status: res.status,
                    body: data
                };
            } else {
                return {
                    status: res.status,
                    body: null
                };
            }
        },

        async getCountries() {
            let URL = "/api/v1/users/countries";

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
    }
};
</script>
