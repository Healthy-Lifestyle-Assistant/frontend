<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-center">
        

        <AlertComponent :message="message" :messageType="messageType" />

        <form @submit.prevent="submitForm" style="width: fit-content;" class="mb-5">
            <div class="mb-4">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username" ref="username" >
            </div>

            <div class="mb-4">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" ref="email" >
            </div>

            <div class="mb-4">
                <label for="fullName" class="form-label">Name</label>
                <input type="text" class="form-control" id="fullName" v-model="fullName" ref="fullName" >
            </div>

            <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" ref="password"  >
            </div>

            <div class="mb-4">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" ref="confirmPassword" >
            </div>

            <div v-if="countries" class="mb-4">
                <label for="countries" class="form-label">Country</label>
                <select id="countries" v-model="countryId" class="form-select" aria-label="Select Country" ref="countryId" >
                    <option v-for="elt in countries" :key="elt.id" :value="elt.id">{{ elt.name }}</option>
                </select>
            </div>

             <div class="mb-4">
                <label for="age" class="form-label">Age</label>
                <input type="age" class="form-control" id="age" v-model="age" ref="age">
            </div>

            <button type="submit" class="btn btn-secondary mt-4" @click="submitForm">Update</button>
            <br><br>
        </form> 

        <form v-if="!isDeleted" @submit.prevent="submitFormDelete" style="min-width: 13rem; width: fit-content;"
            class="mb-5">
            <button type="submit" class="btn btn-warning mt-4">Delete</button>
        </form>
        <br>
    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { getToken } from "../../shared/js/common.js";
import { getAndValidateToken } from "../../shared/js/common.js";
import AlertComponent from "../../shared/components/AlertComponent.vue";


export default {
    name: "SettingsPage",

    setup() {
        useMeta({
            title: "Settings",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

     data() {
        return {
            id: null,
            username: "",
            email: "",
            fullName: "",
            password: "",
            confirmPassword: "",
            countryId: null,
            countries: null,
            age: null,
            message: "",
            messageType: "",
            oldUsername: "",
            oldEmail: "",
            oldFullName: "",
            oldPassword: "",
            oldConfirmPassword: "",
            oldCountryId: null,
            oldCountries: null,
            oldAge: null,
            isDeleted: false

        };
    },

    components: {
        AlertComponent
    },




    async created() {
        this.$store.commit("setCurrentUrl", `/users-settings/${this.$route.params.id}`);

        let countriesResponse = await this.getCountries();
        this.countries = countriesResponse.body;

        const token = await getAndValidateToken();

        if (!token) {
            this.$store.commit("setLogged", false);
           this.$router.push("/login");
        } else {
            this.$store.commit("setLogged", true);
            await this.getUserDetails(this.$route.params.id);
       }
    },  

    methods: {
        async submitForm() {
            const requestDto = {
                updatedUsername: this.username == this.oldUsername ? null : this.username,
                updatedEmail: this.email == this.oldEmail ? null : this.email,
                updatedFullName: this.fullName == this.oldFullName ? null : this.fullName,
                updatedPassword: this.password == this.oldPassword ? null : this.password,
                updatedConfirmPassword: this.password == this.oldConfirmPassword ? null : this.password,
                updatedCountryId: this.countryId == this.oldCountryId ? null : this.countryId,
                updatedAge: this.age == this.oldAge ? null : this.age
            };

            try {
                const res = await this.updateUserDetails(requestDto);

                if (res.status === 200) {
                    this.messageType = "SUCCESS";
                    this.message = "Profile has been updated successfully";

                    this.username = res.body.username;
                    this.email = res.body.email;
                    this.fullName = res.body.fullName;
                    this.password = res.body.password;
                    this.confirmPassword = res.body.password;
                    this.countryId = res.body.countryId;
                    this.age = res.body.age;
                } else {
                    let messageBuilder = "";
                    for (const key in res.body) {
                        messageBuilder += `${key}: ${res.body[key]}. `;
                    }
                    this.messageType = "WARNING";
                    this.message = `An error occured (${messageBuilder}Status ${res.status})`;
                }
            } catch (error) {
                this.messageType = "WARNING";
                this.message = `An error occurred (${error})`;
            }
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

        async submitFormDelete() {
            try {
                const res = await this.deleteUser(this.$route.params.id);

                if (res.status === 204) {
                    this.messageType = "SUCCESS";
                    this.message = "Profile has been deleted successfully";
                    this.isDeleted = true;
                } else {
                    this.messageType = "WARNING";
                    this.message = `An error occurred (${res.status})`;
                }
            } catch (error) {
                this.messageType = "WARNING";
                this.message = `An error occurred (${error})`;
            }
        },

        async getUserDetails() {
            let URL = `/api/v1/users`;
            let token = getToken();

            const res = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();
            this.id = data.id;
            this.username = data.username;
            this.oldUsername = data.username;
            this.email = data.email;
            this.oldEmail = data.email;
            this.fullName = data.fullName;
            this.oldFullName = data.fullName;
            this.password = data.password;
            this.oldPassword = data.password;
            this.confirmPassword = data.password;
            this.oldConfirmPassword = data.password;
            this.countryId = data.countryId;
            this.oldCountryId = data.countryId;
            this.age = data.age;
            this.oldAge = data.age;

             this.$nextTick(() => {
        this.$refs.username.placeholder = data.username; 
        this.$refs.email.placeholder = data.email;
        this.$refs.fullName.placeholder = data.fullName;
        this.$refs.password.placeholder = "********";
        this.$refs.confirmPassword.placeholder = "********";
        this.$refs.countryId.placeholder = data.countryId;
        this.$refs.age.placeholder = data.age;
       
    });
        },

        async updateUserDetails(requestBody) {
            let URL = `/api/v1/users/${this.id}`;
            let token = getToken();

            const res = await fetch(URL, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });

            const data = await res.json();
            if (res.status === 200) {
                this.id = data.id;
                this.username = data.username;
                this.oldUsername = data.username;
                this.email = data.email;
                this.oldEmail = data.email;
                this.fullName = data.fullName;
                this.oldFullName = data.fullName;
                this.password = data.password;
                this.oldPassword = data.password;
                this.confirmPassword = data.password;
                this.oldConfirmPassword = data.password;
                this.countryId = data.countryId;
                this.oldCountryId = data.countryId;
                this.age = data.age;
                this.oldAge = data.age;
            }

            return {
                status: res.status,
                body: data
            };
        },

        async deleteUser() {
            let URL = `/api/v1/users/${this.id}`;
            let token = getToken();

            const res = await fetch(URL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            this.$store.commit("setCurrentUrl", "/login");
            localStorage.removeItem("token");
            this.$store.commit("setLogged", false);
            this.$router.push("/login");
            return {
                status: res.status
            };
        },
    
    }
};

</script>
