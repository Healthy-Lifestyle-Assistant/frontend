<template>
    <div v-if="message" :class="alertClasses" role="alert">
        {{ message }}
    </div>
</template>
  
<script>
export default {
    name: "AlertComponent",

    props: {
        message: String,
        messageType: String
    },

    computed: {
        alertClasses() {
            return {
                'alert': true,
                'alert-secondary': this.messageType === "SECONDARY",
                'alert-warning': this.messageType === "WARNING",
                'alert-success': this.messageType === "SUCCESS"
            };
        },
    },
};
</script>