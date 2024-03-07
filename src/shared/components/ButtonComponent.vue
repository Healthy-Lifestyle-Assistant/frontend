<template>
    <router-link :to="link" class="btn btn-outline-secondary" role="button"
                 :class="{'disabled': isDisabled}">
        {{ title }}
    </router-link>
</template>

<script>
export default {
    name: "ButtonComponent",

    props: {
        title: String,
        link: String,
        isDisabled: Boolean
    }
};
</script>