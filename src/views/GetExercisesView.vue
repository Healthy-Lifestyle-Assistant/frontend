<template>
    <div v-if="entities">
        <h2>List exercises</h2>
        <ul v-if="entities">
            <li v-for="entity in entities" :key="entity.id">{{ entity.id }}: {{ entity.title }} {{ entity.description }}

                <ul v-if="entity.bodyParts">
                    <li v-for="bodyPart in entity.bodyParts" :key="bodyPart.id">
                        {{ bodyPart.id }}: {{ bodyPart.name }}
                    </li>
                </ul>
                <ul v-if="entity.httpRefs">
                    <li v-for="httpRef in entity.httpRefs" :key="httpRef.id">
                        {{ httpRef.id }}: {{ httpRef.name }} {{ httpRef.description }} {{ httpRef.ref }} {{ httpRef.isCustom
                        }}
                    </li>
                </ul>
            </li>

        </ul>
    </div>

    <p v-if="message" :class="{ 'success-message': isSuccess, 'error-message': isError }">
        {{ message }}
    </p>
</template>

<script>
export default {
    name: "GetExercisesView",
    data() {
        return {
            entities: null,
            message: ""
        };
    },
    computed: {
        isSuccess() {
            return this.message.includes('success');
        },
        isError() {
            return this.message.includes('error');
        }
    },
    methods: {
        async getExercisesApi(token, isCustomOnly) {
            let URL = "/api/v1/exercises";
            if (isCustomOnly) URL = URL + "?isCustomOnly=true"
            const res = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();
            return {
                status: res.status,
                body: data
            };
        }
    },
    async created() {
        const token = localStorage.getItem("token");
        if (token === null || token === "") this.$router.push("/login");
        else {
            try {
                const res = await this.getExercisesApi(token, false);
                if (res.status === 200) {
                    this.entities = res.body.exercises;
                }
                else if (res.status === 401) {
                    this.$router.push("/login");
                }
                else {
                    this.message = `Unexpected response status (${res.status})`;
                }
            } catch (error) {
                this.message = "An error occurred while signing up. Try again";
                console.error(error);
            }
        }
    }
};
</script>

<style>
.success-message {
    color: green;
}

.error-message {
    color: red;
}
</style>
