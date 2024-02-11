<template>
    <div v-if="alerts && alerts.length > 0" class="form-width">
        <div v-for="alert in alerts" :key="alert.key" :class="{
            'alert': true, 'alert-secondary': alert.messageType === 'SECONDARY',
            'alert-warning': alert.messageType === 'WARNING', 'alert-success': alert.messageType === 'SUCCESS'
        }" role="alert">
            {{ alert.keyName }} >> {{ getAlertValue(alert, alert.keyName) }}
        </div>
    </div>
</template>

<script>
export default {
    name: "AlertListComponent",

    props: {
        alerts: Array,
        messageType: String
    },

    methods: {
        getAlertValue(alert, keyName) {
            return alert[keyName];
        }
    }
};
</script>