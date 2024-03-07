<template>
    <div v-if="isNotificationVisible() && !isClosedByUser" class="mb-3">
        <div class="alert alert-success" role="alert"
             style="width: fit-content;">
            {{ getNotification() }}
        </div>
        <button class="btn btn-outline-secondary me-2" role="button"
                @click="onClearButtonClick">Clear
        </button>
        <button class="btn btn-secondary" role="button" @click="onCloseButtonClick">Close</button>
    </div>
</template>

<script>
export default {
    name: "AlertNotificationComponent",

    data() {
        return {
            isClosedByUser: false
        }
    },

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
        },

        onCloseButtonClick() {
            this.isClosedByUser = true;
        }
    }
};
</script>