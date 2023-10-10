<template>
    <metainfo>
		<template v-slot:title="{ content }">{{ content }}</template>
	</metainfo>
    
    <!-- <div>
        <h2>Sign Up</h2>
        <form @submit.prevent="submitForm">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required />
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div>
                <label for="fullName">Full name:</label>
                <input type="text" id="fullName" v-model="fullName" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <div>
                <label for="confirmPassword">Confirm password:</label>
                <input type="password" id="confirmPassword" v-model="confirmPassword" required />
            </div>
            <button type="submit">Sign Up</button>
        </form>

        <p v-if="message" :class="{ 'success-message': isSuccess, 'error-message': isError }">
            {{ message }}
        </p>
    </div> -->

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
    name: "SignupView",

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
            username: "",
            email: "",
            fullName: "",
            password: "",
            confirmPassword: "",
            message: ""
        };
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
                console.log("submitForm():")
                console.log(res);

                if (res.status === 201) {
                    this.message = "Signup successful! Now you can login to your account";
                } else {
                    this.message = "An error occurred while signing up. Try again";
                }
            } catch (error) {
                this.message = "An error occurred while signing up. Try again";
                console.error(error);
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
            console.log("signupApi():");
            console.log(data);
            
            return {
                status: res.status,
                body: data
            };
        }
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/signup");
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
