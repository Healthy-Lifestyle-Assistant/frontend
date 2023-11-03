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
        isUnlogged: Boolean,
        isError: Boolean,
    },

    computed: {
        alertClasses() {
            return {
                'alert': true,
                'alert-secondary': this.isUnlogged,
                'alert-warning': this.isError,
            };
        },
    },
};
</script>