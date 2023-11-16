<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-center">
        <AlertComponent :message="message" :messageType="messageType" />

        <form @submit.prevent="submitForm" style="width: fit-content;" class="mb-5">
            <div class="mb-4">
                <label for="username" class="form-label">Username<span style="color: red;">*</span></label>
                <input type="text" class="form-control" id="username" v-model="username" placeholder="johndoe" required>
            </div>

            <div class="mb-4">
                <label for="email" class="form-label">Email<span style="color: red;">*</span></label>
                <input type="email" class="form-control" id="email" v-model="email" placeholder="john-doe@domain.com" required>
            </div>

            <div class="mb-4">
                <label for="fullName" class="form-label">Name<span style="color: red;">*</span></label>
                <input type="text" class="form-control" id="fullName" v-model="fullName" placeholder="John Doe" required>
            </div>

            <div class="mb-4">
                <label for="password" class="form-label">Password<span style="color: red;">*</span></label>
                <input type="password" class="form-control" id="password" v-model="password" placeholder="********" required>
            </div>

            <div class="mb-4">
                <label for="confirmPassword" class="form-label">Confirm Password<span style="color: red;">*</span></label>
                <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" placeholder="********" required>
            </div>

            <div v-if="countries" class="mb-4">
                <label for="countries" class="form-label">Country<span style="color: red;">*</span></label>
                <select id="countries" v-model="countryId" class="form-select" aria-label="Select Country" required>
                    <option v-for="elt in countries" :key="elt.id" :value="elt.id">{{ elt.name }}</option>
                </select>
            </div>

             <div class="mb-4">
                <label for="age" class="form-label">Age</label>
                <input type="age" class="form-control" id="age" v-model="age">
            </div>

            <div>
                <span style="color: red;">*</span> Required Fields
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
                    this.messageType = "WARNING";
                    this.message = `An error occurred ${res.status}`;
                }
            } catch (error) {
                this.messageType = "WARNING";
                this.message = `An error occurred ${error}`;
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
