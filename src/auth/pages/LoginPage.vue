<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-center">
        <AlertComponent :message="message" :messageType="messageType" />

        <form @submit.prevent="submitForm" style="width: fit-content;">
            <div class="mb-4">
                <label for="usernameOrEmail" class="form-label">Username or email<span style="color: red;">*</span></label>
                <input type="text" class="form-control" id="usernameOrEmail" v-model="usernameOrEmail" placeholder="jane-doe@domain.com" required>
            </div>

            <div class="mb-4">
                <label for="password" class="form-label">Password<span style="color: red;">*</span></label>
                <input type="password" class="form-control" id="password" v-model="password" placeholder="********" required>
            </div>

            <div class="mb-4">
                <label for="confirmPassword" class="form-label">Confirm password<span style="color: red;">*</span></label>
                <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" placeholder="********" required>
            </div>

            <div>
                <span style="color: red;">*</span> Required Fields
            </div>

            <button type="submit" class="btn btn-secondary mt-4">Login</button>
        </form>
    </div>
</template>
  
<script>
import { useMeta } from "vue-meta";
import AlertComponent from "../../share/components/AlertComponent.vue";

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
            message: "",
            messageType: ""
        };
    },

    components: {
        AlertComponent
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/login");
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
                    this.messageType = "SUCCESS";
                    this.message = "Login successful";

                    if (this.$store.state.previousUrl === null || this.$store.state.previousUrl === "" ||
                        this.$store.state.previousUrl === "/login") {
                        this.$router.push("/workouts");
                    } else {
                        this.$router.push(this.$store.state.previousUrl);
                    }
                } else {
                    this.messageType = "WARNING";
                    this.message = "An error occurred while signing up. Try again";
                }
            } catch (error) {
                this.messageType = "WARNING";
                this.message = "An error occurred while signing up. Try again";
            }

            this.usernameOrEmail = null;
            this.password = null;
            this.confirmPassword = null;
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