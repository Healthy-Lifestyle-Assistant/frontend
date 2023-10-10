<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div class="d-flex">
            <router-link to="/workouts" class="btn btn-primary" role="button">Add Custom Exercise</router-link>
        </div>

        <br><br>

        <div v-if="exercises" class="d-flex flex-wrap">

            <div v-for="exercise in exercises" :key="exercise.id">
                <ExerciseComponent :title="exercise.title" :description="exercise.description"
                    :bodyParts="exercise.bodyParts" :type="exercise.type" />
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
            title: "Exercises",
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

    computed: {
        isSuccess() {
            return this.message.includes('success');
        },

        isError() {
            return this.message.includes('error');
        }
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts-exercises");

        this.exercises = [
            {
                "id": 1,
                "title": "Exercise Title 1",
                "description": "Exercise Description 1",
                "bodyParts": [
                    {
                        "id": 1,
                        "name": "BodyPart1"
                    },
                    {
                        "id": 2,
                        "name": "BodyPart2"
                    }
                ],
                "type": "Default"
            },
            {
                "id": 2,
                "title": "Exercise Title 2",
                "description": "Exercise Description 2",
                "bodyParts": [
                    {
                        "id": 3,
                        "name": "BodyPart3"
                    },
                    {
                        "id": 4,
                        "name": "BodyPart4"
                    }
                ],
                "type": "Default"
            },
            {
                "id": 3,
                "title": "Exercise Title 3",
                "description": "Exercise Description 3",
                "bodyParts": [
                    {
                        "id": 5,
                        "name": "BodyPart5"
                    }
                ],
                "type": "Default"
            }
        ];

        // const res = await this.getDefaultExercisesApi();
        // this.entities = res.body;

        // const token = localStorage.getItem("token");
        // if (token === null || token === "") this.$router.push("/login");
        // else {
        //     try {
        //         const res = await this.getExercisesApi(token, false);
        //         if (res.status === 200) {
        //             this.entities = res.body.exercises;
        //         }
        //         else if (res.status === 401) {
        //             this.$store.commit('setLogged', false);
        //             this.$router.push("/login");
        //         }
        //         else {
        //             this.$store.commit('setLogged', false);
        //             this.message = `Unexpected response status (${res.status})`;
        //         }
        //     } catch (error) {
        //         this.message = "An error occurred while signing up. Try again";
        //         console.error(error);
        //     }
        // }
    },

    // methods: {
    //     async getExercisesApi(token, isCustomOnly) {
    //         let URL = "/api/v1/exercises";
    //         if (isCustomOnly) URL = URL + "?isCustomOnly=true"
    //         const res = await fetch(URL, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         });

    //         const data = await res.json();
    //         return {
    //             status: res.status,
    //             body: data
    //         };
    //     },

    //     async getDefaultExercisesApi() {
    //         let URL = "/api/v1/exercises/default";

    //         const res = await fetch(URL, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });

    //         const data = await res.json();

    //         return {
    //             status: res.status,
    //             body: data
    //         };
    //     }
    // }
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
