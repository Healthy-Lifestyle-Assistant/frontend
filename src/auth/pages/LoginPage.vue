<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-center">
        <h4 class="text-muted mb-4">Login</h4>

        <AlertComponent :message="message" :messageType="messageType" />
        <AlertComponent id="sharedMessage" v-if="$store.state.sharedMessage !== ''" :message="$store.state.sharedMessage"
            :messageType="$store.state.sharedMessageType" />

        <form @submit.prevent="submitForm" style="width: fit-content;">
            <div class="mb-4">
                <label for="usernameOrEmail" class="form-label">Username or email</label>
                <input type="text" class="form-control" id="usernameOrEmail" v-model="usernameOrEmail"
                    placeholder="Enter username/email" required>
            </div>

            <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" placeholder="Enter password"
                    required>
            </div>

            <div class="mb-4">
                <label for="confirmPassword" class="form-label">Confirm password</label>
                <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword"
                    placeholder="Confirm password" required>
            </div>

            <button type="submit" class="btn btn-secondary mt-4">Login</button>
        </form>
    </div>
</template>
  
<script>
import { useMeta } from "vue-meta";
import AlertComponent from "../../shared/components/AlertComponent.vue";

export default {
    name: "LoginPage",

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
            if (this.$store.state.sharedMessage !== "") {
                this.$store.commit("setSharedMessage", "");
                this.$store.commit("setSharedMessageType", "");
            }

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
                        this.$router.push("/workouts-list");
                    } else {
                        this.$router.push(this.$store.state.previousUrl);
                    }
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
