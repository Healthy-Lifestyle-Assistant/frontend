<template>
    <router-link :to="link" class="btn btn-outline-secondary" role="button">
        {{ title }}
    </router-link>
</template>

<script>
export default {
    name: "ButtonComponent",

    props: {
        title: String,
        link: String
    }
};
</script>