<template>
    <div></div>
</template>

<script>
export default {
    name: "LogoutView",
    created() {
        localStorage.removeItem("token");
        this.$store.commit('setLogged', false);
        this.$router.push("/login");
    }
}
</script>
