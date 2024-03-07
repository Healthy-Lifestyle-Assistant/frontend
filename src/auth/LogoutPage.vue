<template>
    <div></div>
</template>

<script>
export default {
    name: "LogoutPage",

    created() {
        localStorage.removeItem("token");
        this.$store.commit("setCurrentUrl", "/login");
        this.$store.commit("setLogged", false);
        this.$router.push("/login");
    }
}
</script>
