<template>
    <div class="hello">
        <h1>{{ message }}</h1>
        <p>{{ this.apiMessage }}</p>
    </div>
</template>
  
<!-- ============================================ -->
<script>
export default {
    name: "HelloView",

    props: {
        message: String
    },

    data() {
        return {
            apiMessage: Object
        }
    },

    methods: {
        async getHelloWorld() {
            const res = await fetch("/api/v1/helloworld", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            console.log("Response data:");
            console.log(data);

            return data;
        }
    },

    async created() {
        this.apiMessage = await this.getHelloWorld();
    }
}
</script>
  
<!-- ============================================ -->
<style scoped>
.hello {
    color: green;
}
</style>
