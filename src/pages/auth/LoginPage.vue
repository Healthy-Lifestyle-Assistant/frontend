<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex justify-content-center">
        <form @submit.prevent="submitForm" style="width: fit-content;">
            <div class="mb-3">
                <label for="usernameOrEmail" class="form-label">Username or email</label>
                <input type="text" class="form-control" id="usernameOrEmail" v-model="usernameOrEmail" required>
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
            </div>

            <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm password</label>
                <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" required>
            </div>

            <button type="submit" class="btn btn-primary mt-4">Login</button>
        </form>

        <p v-if="message" :class="{ 'success-message': isSuccess, 'error-message': isError }">
            {{ message }}
        </p>
    </div>
</template>
  
<script>
import { useMeta } from "vue-meta";

export default {
    name: "LoginPage",

    setup() {
        useMeta({
            title: "Healthy - Login",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            usernameOrEmail: "",
            password: "",
            confirmPassword: "",
            message: ""
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/login");
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
            const loginRequestDto = {
                usernameOrEmail: this.usernameOrEmail,
                password: this.password,
                confirmPassword: this.confirmPassword
            };

            try {
                const res = await this.loginApi(loginRequestDto);

                if (res.status === 200) {
                    localStorage.setItem("token", JSON.stringify(res.body.token).slice(1, -1));
                    this.$store.commit('setLogged', true);
                    this.message = "Login successful";
                    this.$router.push(this.$store.state.previousUrl);
                } else {
                    this.message = "An error occurred while signing up. Try again";
                }
            } catch (error) {
                this.message = "An error occurred while signing up. Try again";
            }
        },

        async loginApi(requestBody) {
            const res = await fetch("/api/v1/users/auth/login", {
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
