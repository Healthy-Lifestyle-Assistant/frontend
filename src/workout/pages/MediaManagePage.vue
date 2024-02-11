<template>
	<metainfo>
		<template v-slot:title="{ content }">{{ content }}</template>
	</metainfo>

	<div class="d-flex flex-column align-items-start">

		<div>
			<BreadcrumbWorkoutsComponent />
			<AlertListComponent :alerts="alerts" />
			<AlertComponent :message="message" :messageType="messageType" />
		</div>

		<!-- Update Media -->
		<h4 v-if="!isDeleted" class="mb-4 text-muted">Update Media</h4>

		<form v-if="!isDeleted" class="form-width mb-5" @submit.prevent="onSubmitUpdateForm">
			<div class="mb-4">
				<label for="name" class="form-label">Current title: {{ httpRef.name }}</label>
				<div class="d-flex align-items-center mb-2 me-3">
					<input type="text" class="form-control me-1" id="name" v-model="formName" placeholder="Enter new title">
					<TooltipComponent :text="getTooltipText('title')" />
				</div>
			</div>

			<div class="mb-4">
				<label for="description" class="form-label">
					Current description: {{ httpRef.description ? httpRef.description : "None" }}
				</label>
				<div class="d-flex align-items-center mb-2 me-3">
					<textarea rows="3" class="form-control me-1" id="description" v-model="formDescription"
						placeholder="Enter new description"></textarea>
					<TooltipComponent :text="getTooltipText('description')" />
				</div>
			</div>

			<div class="mb-4">
				<label for="ref" class="form-label">Current media reference: {{ httpRef.ref }}</label>
				<div class="d-flex align-items-center mb-2 me-3">
					<input type="text" class="form-control me-1" id="ref" v-model="formRef" placeholder="https://new-media.com">
					<TooltipComponent :text="getTooltipText('ref')" />
				</div>
			</div>

			<button @click.prevent="onClearForm" class="btn btn-outline-secondary mt-2 me-2">Clear</button>
			<button type="submit" class="btn btn-secondary mt-2">Update</button>
		</form>

		<!-- Delete media -->
		<div v-if="!isDeleted">
			<h4 class="mb-2 text-muted">Delete Media</h4>
			<div class="mb-2">Deletion of the media reference will not affect associated workouts and exercises.</div>
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
import { getAndValidateToken, getToken, on401, redirectToLoginSessionExpired } from "@/shared/js/auth";
import { getStringOrNull } from "@/shared/js/stringUtils";
import { buildAlertsList } from "@/shared/js/exceptions";
import { HTTP_REFS_SLASH } from "@/shared/URL";
import { SUCCESS, WARNING, MEDIA_UPDATED_SUCCESSFULLY, MEDIA_DELETED_SUCCESSFULLY } from "@/shared/Messages";
import { DESCRIPTION_TOOLTIP, TITLE_TOOLTIP, WEB_LINK } from "@/shared/Tooltips";
import AlertComponent from "@/shared/components/AlertComponent.vue";
import AlertListComponent from "@/shared/components/AlertListComponent.vue";
import BreadcrumbWorkoutsComponent from "../components/BreadcrumbWorkoutsComponent.vue";
import TooltipComponent from "@/shared/components/TooltipComponent.vue";

export default {
	name: "MediaManagePage",

	components: {
		AlertComponent,
		AlertListComponent,
		BreadcrumbWorkoutsComponent,
		TooltipComponent
	},

	setup() {
		useMeta({
			title: "Manage Media",
			htmlAttrs: {
				lang: "en"
			}
		})
	},

	data() {
		return {
			formName: null,
			formDescription: null,
			formRef: null,

			httpRef: {},

			message: null,
			messageType: null,
			alerts: [],

			isDeleted: false,
			confirmDeletion: false
		};
	},

	async created() {
		this.$store.commit("setCurrentUrl", `/workouts-manage-media/${this.$route.params.id}`);
		const token = await getAndValidateToken(this);

		if (!token) {
			redirectToLoginSessionExpired(this);
		} else {
			this.$store.commit("setLogged", true);
			let response = await this.getHttpRefDetails(this.$route.params.id);

			if (response.status === 200) {
				this.httpRef = response.body;
			} else if (response.status === 401) {
				this.$store.commit("setLogged", false);
				this.$router.push("/login");
			} else {
				this.alerts = buildAlertsList(response.body, WARNING);
			}
		}
	},

	methods: {
		async onSubmitUpdateForm() {
			const requestDto = {
				name: getStringOrNull(this.formName),
				description: getStringOrNull(this.formDescription),
				ref: getStringOrNull(this.formRef)
			};

			const response = await this.updateHttpRef(requestDto);
			if (response.status === 200) {
				this.httpRef = response.body;
				this.onClearForm();
				this.messageType = SUCCESS;
				this.message = MEDIA_UPDATED_SUCCESSFULLY;
			} else if (response.status === 401) {
				on401(this);
			} else {
				this.message = null;
                this.messageType = null;
				this.alerts = buildAlertsList(response.body, WARNING);
			}
		},

		async onSubmitDeleteForm() {
			const response = await this.deleteHttpRef(this.$route.params.id);
			if (response.status === 204) {
				this.messageType = SUCCESS;
				this.message = MEDIA_DELETED_SUCCESSFULLY;
				this.isDeleted = true;
			} else if (response.status === 401) {
				on401(this);
			} else {
				this.alerts = buildAlertsList(response.body, WARNING);
			}
		},

		onClearForm() {
			this.formName = null;
			this.formDescription = null;
			this.formRef = null;
			this.message = null;
			this.messageType = null;
			this.alerts = [];
		},

		getTooltipText(fieldName) {
			if (fieldName === "title") {
				return TITLE_TOOLTIP;
			}
			if (fieldName === "description") {
				return DESCRIPTION_TOOLTIP;
			}
			if (fieldName === "ref") {
				return WEB_LINK;
			}
		},

		async getHttpRefDetails(id) {
			let URL = HTTP_REFS_SLASH + id;
			let token = getToken();
			const res = await fetch(URL, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				}
			});
			const data = await res.json();
			return {
				status: res.status,
				body: data
			};
		},

		async updateHttpRef(requestBody) {
			let URL = HTTP_REFS_SLASH + this.$route.params.id;
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
			return {
				status: res.status,
				body: data
			};
		},

		async deleteHttpRef(id) {
			let URL = HTTP_REFS_SLASH + id;
			let token = getToken();
			const res = await fetch(URL, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				}
			});
			return {
				status: res.status
			};
		}
	}
};
</script>
