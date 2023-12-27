<template>
    <div v-if="message" :class="alertClasses" role="alert" style="width: fit-content;">
        {{ message }}
        <!-- <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> -->
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
                "alert": true,
                "alert-secondary": this.messageType === "SECONDARY",
                "alert-warning": this.messageType === "WARNING",
                "alert-success": this.messageType === "SUCCESS"
                // "alert-dismissible fade show": true
            };
        },
    }
};
</script>