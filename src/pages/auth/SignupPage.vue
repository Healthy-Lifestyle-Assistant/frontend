<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex justify-content-center">
        <form @submit.prevent="submitForm" style="width: fit-content;">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username" required>
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" required>
            </div>

            <div class="mb-3">
                <label for="fullName" class="form-label">Full name</label>
                <input type="text" class="form-control" id="fullName" v-model="fullName" required>
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
            </div>

            <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm password</label>
                <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" required>
            </div>

            <button type="submit" class="btn btn-primary mt-4">Sign Up</button>
        </form>

        <p v-if="message" :class="{ 'success-message': isSuccess, 'error-message': isError }">
            {{ message }}
        </p>
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
            message: ""
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/signup");
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
                confirmPassword: this.confirmPassword
            };

            try {
                const res = await this.signupApi(signupRequestDto);

                if (res.status === 201) {
                    this.message = "Signup successful! Now you can login to your account";
                } else {
                    this.message = "An error occurred while signing up. Try again";
                }
            } catch (error) {
                this.message = "An error occurred while signing up. Try again";
            }
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
        }
    }
};
</script>

<style>
.success-message {
    color: green;
}

.error-message {
    color: red;
}
</style>
