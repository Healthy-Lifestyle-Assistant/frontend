<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div class="d-flex">
            <router-link to="/workouts" class="btn btn-primary me-4" role="button">Add Custom Exercise</router-link>
            <router-link to="/workouts-media" class="btn btn-primary me-4" role="button">Media</router-link>
        </div>

        <br><br>

        <div v-if="exercises" class="d-flex flex-wrap">

            <div v-for="exercise in exercises" :key="exercise.id">
                <ExerciseComponent :title="exercise.title" :description="exercise.description"
                    :bodyParts="exercise.bodyParts" :isCustom="exercise.custom" :needsEquipment="exercise.needsEquipment" />
            </div>

        </div>
    </div>

    <p v-if="message" :class="{ 'success-message': isSuccess, 'error-message': isError }">
        {{ message }}
    </p>
</template>

<script>
import { useMeta } from "vue-meta";
import ExerciseComponent from "../../components/workouts/ExerciseComponent.vue";

export default {
    name: "ExercisesPage",

    setup() {
        useMeta({
            title: "Healthy - Exercises",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            exercises: null,
            message: ""
        };
    },

    components: {
        ExerciseComponent
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-exercises");

        const isTokenValid = await this.validateToken();

        if (isTokenValid) {
            this.$store.commit("setLogged", true);
            // 
        } else {
            try {
                this.$store.commit("setLogged", false);

                const res = await this.getDefaultExercises();

                if (res.status === 200) {
                    this.exercises = res.body;
                }
                else if (res.status === 401) {
                    this.$router.push("/login");
                }
                else {
                    this.message = `Unexpected response status (${res.status})`;
                }
            } catch (error) {
                this.message = "An error occurred";
            }
        }
    },

    computed: {
        isSuccess() {
            return this.message.includes("success");
        },

        isError() {
            return this.message.includes("error");
        }
    },

    methods: {
        async validateToken() {
            const token = localStorage.getItem("token");
        
            if (token === null || token === "") {
                return false; 
            } else {
                // GET /api/v1/auth/validate
                return  false;
            }
        },

        async getDefaultExercises() {
            let URL = "/api/v1/workouts/exercises/default";

            const res = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            return {
                status: res.status,
                body: data
            };
        }
        // async getExercisesApi(token, isCustomOnly) {
        //     let URL = "/api/v1/exercises";
        //     if (isCustomOnly) URL = URL + "?isCustomOnly=true"
        //     const res = await fetch(URL, {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Authorization": `Bearer ${token}`
        //         }
        //     });

        //     const data = await res.json();
        //     return {
        //         status: res.status,
        //         body: data
        //     };
        // }
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
