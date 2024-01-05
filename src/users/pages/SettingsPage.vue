<template>
	<metainfo>
		<template v-slot:title="{ content }">{{ content }}</template>
	</metainfo>

	<div class="d-flex flex-column align-items-start">
		<AlertComponent :message="message" :messageType="messageType" />

		<h4 class="mb-4 text-muted">Update Profile</h4>

		<form class="mb-5" @submit.prevent="submitForm" style="width: fit-content">
			<div class="mb-4">
				<label for="username" class="form-label">Current username: {{ this.usernameLabel }}</label>
				<input type="text" class="form-control" id="username" v-model="username" placeholder="Enter new username" />
			</div>

			<div class="mb-4">
				<label for="email" class="form-label">Current email: {{ this.emailLabel }}</label>
				<input type="email" class="form-control" id="email" v-model="email" placeholder="Enter new email" />
			</div>

			<div class="mb-4">
				<label for="fullName" class="form-label">Current full name: {{ this.fullNameLabel }}</label>
				<input type="text" class="form-control" id="fullName" v-model="fullName" placeholder="Enter new full name" />
			</div>

			<div class="mb-4">
				<label for="age" class="form-label">Current age: {{ this.ageLabel === null ? "None" : this.ageLabel
				}}</label>
				<input type="age" class="form-control" id="age" v-model="age" placeholder="Enter new age" />
			</div>

			<div v-if="countries" class="mb-4">
				<label for="countries" class="form-label">Current country</label>
				<select id="countries" v-model="countryId" class="form-select" aria-label="Select new country" required>
					<option v-for="elt in countries" :key="elt.id" :value="elt.id">
						{{ elt.name }}
					</option>
				</select>
			</div>

			<div class="mb-4">
				<label for="password" class="form-label">Update password</label>
				<input type="password" class="form-control" id="password" v-model="password" placeholder="Enter new password" />
			</div>

			<div class="mb-4">
				<label for="confirmPassword" class="form-label">Confirm new password</label>
				<input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword"
					placeholder="Enter new password" />
			</div>

			<button type="submit" class="btn btn-secondary mt-4">Update</button>
		</form>

		<h4 class="mb-2">Delete Profile</h4>

		<form @submit.prevent="submitFormDelete" style="min-width: 13rem; width: fit-content" class="mb-5">
			<button type="submit" class="btn btn-warning mt-4">Delete</button>
		</form>
		<br />
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
				lang: "en",
			},
		});
	},

	data() {
		return {
			usernameLabel: null,
			emailLabel: null,
			fullNameLabel: null,
			ageLabel: null,
			countries: null,

			userId: null,
			username: null,
			email: null,
			fullName: null,
			password: null,
			confirmPassword: null,
			countryId: null,
			age: null,

			message: "",
			messageType: ""
		};
	},

	components: {
		AlertComponent,
	},

	async created() {
		this.$store.commit("setCurrentUrl", "/settings");

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
				username: this.username,
				email: this.email,
				fullName: this.fullName,
				countryId: this.countryId,
				age: this.age,
				password: this.password,
				confirmPassword: this.confirmPassword
			};

			try {
				const res = await this.updateUserDetails(requestDto);

				if (res.status === 200) {
					this.messageType = "SUCCESS";
					this.message = "Profile has been updated successfully";

					this.usernameLabel = res.body.username;
					this.emailLabel = res.body.email;
					this.fullNameLabel = res.body.fullName;
					this.countryIdLabel = res.body.countryId;
					this.ageLabel = res.body.age;
				} else if (res.status === 401) {
					localStorage.removeItem("token");
					this.$store.commit("setLogged", false);
					this.$router.push("/login");
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

			this.username = null;
			this.email = null;
			this.fullName = null;
			this.age = null;
			this.password = null;
			this.confirmPassword = null;
		},

		async submitFormDelete() {
			try {
				const res = await this.deleteUser(this.$route.params.id);

				if (res.status === 204) {
					this.messageType = "SUCCESS";
					this.message = "Profile has been deleted successfully";
					localStorage.removeItem("token");
					this.$store.commit("setLogged", false);
					this.$router.push("/signup");
				} else if (res.status === 401) {
					localStorage.removeItem("token");
					this.$store.commit("setLogged", false);
					this.$router.push("/login");
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
					"Content-Type": "application/json",
				},
			});

			const data = await res.json();

			return {
				status: res.status,
				body: data,
			};
		},

		async getUserDetails() {
			let URL = `/api/v1/users`;
			let token = getToken();

			const res = await fetch(URL, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await res.json();

			this.userId = data.id;
			this.usernameLabel = data.username;
			this.emailLabel = data.email;
			this.fullNameLabel = data.fullName;
			this.ageLabel = data.age;
			this.countryId = data.countryId;
		},

		async updateUserDetails(requestBody) {
			let URL = `/api/v1/users/${this.userId}`;
			let token = getToken();

			const res = await fetch(URL, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(requestBody),
			});

			const data = await res.json();

			return {
				status: res.status,
				body: data,
			};
		},

		async deleteUser() {
			let URL = `/api/v1/users/${this.userId}`;
			let token = getToken();

			const res = await fetch(URL, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			return {
				status: res.status,
			};
		},
	},
};
</script>
