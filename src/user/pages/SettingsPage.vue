<template>
	<metainfo>
		<template v-slot:title="{ content }">{{ content }}</template>
	</metainfo>

	<div class="d-flex flex-column align-items-start">
		<AlertComponent :message="message" :messageType="messageType" />

		<!-- Update -->
		<h4 class="mb-4 text-muted">Update Profile</h4>
		<form class="mb-5" @submit.prevent="onSubmitUpdateForm" style="width: fit-content">
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
				<input type="text" class="form-control" id="fullName" v-model="fullName"
					placeholder="Enter new full name" />
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
				<input type="password" class="form-control" id="password" v-model="password"
					placeholder="Enter new password" />
			</div>

			<div class="mb-4">
				<label for="confirmPassword" class="form-label">Confirm new password</label>
				<input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword"
					placeholder="Enter new password" />
			</div>

			<button type="submit" class="btn btn-secondary mt-4">Update</button>
		</form>

		<!-- Delete -->
        <div>
            <h4 class="mb-2 text-muted">Delete Profile</h4>
            <div class="mb-2">Deletion of the profile will delete all user's data.</div>
            <div class="d-flex">
                <input type="checkbox" value="" class="form-check-input" id="confirmDeletion" v-model="confirmDeletion">
                <label for="confirmDeletion" class="form-check-label ms-2"><span class="span-color">Confirm deletion. This
                        action cannot be undone.</span></label>
            </div>

            <form @submit.prevent="onSubmitDeleteForm" style="min-width: 13rem; width: fit-content;" class="mb-5">
                <button :disabled="!confirmDeletion" type="submit" class="btn btn-warning mt-4">Delete</button>
            </form>
            <br>
        </div>
	</div>
</template>

<script>
import { useMeta } from "vue-meta";
import { getToken } from "../../shared/js/auth.js";
import { getAndValidateToken } from "../../shared/js/auth.js";
import { COUNTRIES, USERS, USERS_SLASH } from "../../shared/URL.js";
import { SUCCESS, WARNING, PROFILE_UPDATED_SUCCESSFULLY, PROFILE_DELETED_SUCCESSFULLY } from "../../shared/MESSAGE.js";
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
			messageType: "",
			confirmDeletion: false
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
		async onSubmitUpdateForm() {
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
				const res = await this.updateUser(requestDto);

				if (res.status === 200) {
					this.messageType = SUCCESS;
					this.message = PROFILE_UPDATED_SUCCESSFULLY;

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
					this.messageType = WARNING;
					this.message = messageBuilder;
				}
			} catch (error) {
				this.messageType = WARNING;
				this.message = `Error: ${error}`;
			}

			this.username = null;
			this.email = null;
			this.fullName = null;
			this.age = null;
			this.password = null;
			this.confirmPassword = null;
		},

		async onSubmitDeleteForm() {
			try {
				const res = await this.deleteUser(this.$route.params.id);

				if (res.status === 204) {
					this.messageType = SUCCESS;
					this.message = PROFILE_DELETED_SUCCESSFULLY;
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
					this.messageType = WARNING;
					this.message = messageBuilder;
				}
			} catch (error) {
				this.messageType = WARNING;
				this.message = `Error: ${error}`;
			}
		},

		async getCountries() {
			const res = await fetch(COUNTRIES, {
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
			let token = getToken();
			const res = await fetch(USERS, {
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

		async updateUser(requestBody) {
			let URL = USERS_SLASH + this.userId;
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
			let URL = USERS_SLASH + this.userId;
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
