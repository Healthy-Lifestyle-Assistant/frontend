<template>
    <div v-if="isNotificationVisible()" class="mb-3">
        <div class="alert alert-success" role="alert"
             style="width: fit-content;">
            {{ getNotification() }}
        </div>
        <button class="btn btn-outline-secondary me-2" role="button"
                @click="onClearButtonClick">Clear
        </button>
    </div>
</template>

<script>
export default {
    name: "AlertNotificationComponent",

    methods: {
        isNotificationVisible() {
            return this.$store.state.pushNotification !== null;
        },

        getNotification() {
            if (this.isNotificationVisible()) {
                return this.$store.state.pushNotification;
            }
            return "No notification";
        },

        onClearButtonClick() {
            this.$store.commit("setPushNotification", null);
        }
    }
};
</script>