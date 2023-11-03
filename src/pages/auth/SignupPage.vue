<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-center">
        <div v-if="message" :class="{ 'alert': true, 'alert-secondary': isSuccess, 'alert-warning': isError }" role="alert">
            {{ message }}
        </div>

        <form @submit.prevent="submitForm" style="width: fit-content;">
            <div class="mb-3">
                <label for="username" class="form-label">Username*</label>
                <input type="text" class="form-control" id="username" v-model="username" required>
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Email*</label>
                <input type="email" class="form-control" id="email" v-model="email" required>
            </div>

            <div class="mb-3">
                <label for="fullName" class="form-label">Name*</label>
                <input type="text" class="form-control" id="fullName" v-model="fullName" required>
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password*</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
            </div>

            <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password*</label>
                <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" required>
            </div>

            <div v-if="countries" class="mb-3">
                <label for="countries" class="form-label">Country*</label>
                <select id="countries" v-model="countryId" class="form-select" aria-label="Select Country" required>
                    <option v-for="elt in countries" :key="elt.id" :value="elt.id">{{ elt.name }}</option>
                </select>
            </div>

            <div>
                * Required Fields
            </div>

            <button type="submit" class="btn btn-outline-secondary mt-4">Sign Up</button>
        </form>
    </div>
</template>
  
<script>
import { useMeta } from "vue-meta";

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
            message: ""
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/signup");

        let countriesResponse = await this.getCountries();
        this.countries = countriesResponse.body;
    },

    computed: {
        isSuccess() {
            return this.message.includes('success');
        },

        isError() {
            return this.message.includes('error');
        }
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
            };

            try {
                const res = await this.signupApi(signupRequestDto);

                if (res.status === 201) {
                    this.message = "User account has been created successfully! Now you can login to your account.";
                } else {
                    this.message = `An error occurred ${res.status}`;
                }
            } catch (error) {
                this.message = `An error occurred ${error}`;
            }

            this.username = "";
            this.email = "";
            this.fullName = "";
            this.password = "";
            this.confirmPassword = "";
            this.countryId = null;
        },

        async signupApi(requestBody) {
            const res = await fetch("/api/v1/users/auth/signup", {
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
