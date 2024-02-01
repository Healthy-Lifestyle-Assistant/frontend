<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-center">
        <h4 class="text-muted mb-4">Login</h4>

        <AlertComponent :message="message" :messageType="messageType" />
        <AlertComponent id="sharedMessage" v-if="$store.state.sharedMessage !== ''" :message="$store.state.sharedMessage"
            :messageType="$store.state.sharedMessageType" />

        <form @submit.prevent="onSubmitForm" style="width: fit-content;">
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

            <button type="submit" class="btn btn-secondary mt-4">Login</button>
        </form>
    </div>
</template>
  
<script>
import { useMeta } from "vue-meta";
import { LOGIN } from "../../shared/URL.js";
import { WARNING, SUCCESS, LOGIN_SUCCESSFULL } from "../../shared/MESSAGE.js";
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
        async onSubmitForm() {
            if (this.$store.state.sharedMessage !== "") {
                this.$store.commit("setSharedMessage", "");
                this.$store.commit("setSharedMessageType", "");
            }

            const loginRequestDto = {
                usernameOrEmail: this.usernameOrEmail,
                password: this.password
            };

            try {
                const res = await this.login(loginRequestDto);

                if (res.status === 200) {
                    localStorage.setItem("token", JSON.stringify(res.body.token).slice(1, -1));
                    this.$store.commit('setLogged', true);
                    this.messageType = SUCCESS;
                    this.message = LOGIN_SUCCESSFULL;

                    if (this.$store.state.previousUrl === null || this.$store.state.previousUrl === "" ||
                        this.$store.state.previousUrl === "/login" || this.$store.state.previousUrl === "/signup") {
                        this.$router.push("/workouts-list");
                    } else {
                        this.$router.push(this.$store.state.previousUrl);
                    }
                } else {
                    let messageBuilder = "";
                    for (const key in res.body) {
                        messageBuilder += `${key}: ${res.body[key]}. `;
                    }
                    this.messageType = WARNING;
                    this.message = messageBuilder;
                }
            } catch (error) {
                this.messageType = WARNING;
                this.message = `Error: ${error}`;
            }

            this.usernameOrEmail = null;
            this.password = null;
            this.confirmPassword = null;
        },

        async login(requestBody) {
            const res = await fetch(LOGIN, {
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
