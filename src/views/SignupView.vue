<template>
    <div>
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
    </div>
</template>
  
<script>
export default {
    name: "SignupView",
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
