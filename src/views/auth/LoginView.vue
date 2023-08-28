<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="submitForm">
            <div>
                <label for="usernameOrEmail">Username or email:</label>
                <input type="text" id="usernameOrEmail" v-model="usernameOrEmail" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <div>
                <label for="confirmPassword">Confirm password:</label>
                <input type="password" id="confirmPassword" v-model="confirmPassword" required />
            </div>
            <button type="submit">Login</button>
        </form>

        <p v-if="message" :class="{ 'success-message': isSuccess, 'error-message': isError }">
            {{ message }}
        </p>
    </div>
</template>
  
<script>
export default {
    name: "LoginView",
    data() {
        return {
            usernameOrEmail: "",
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
                } else {
                    this.message = "An error occurred while signing up. Try again";
                }
            } catch (error) {
                this.message = "An error occurred while signing up. Try again";
                console.error(error);
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
