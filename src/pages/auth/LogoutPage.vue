<template>
    <div></div>
</template>

<script>
export default {
    name: "LogoutPage",

    created() {
        this.$store.commit("setCurrentUrl", "/login");
        localStorage.removeItem("token");
        this.$store.commit("setLogged", false);
        this.$router.push("/login");
    }
}
</script>
