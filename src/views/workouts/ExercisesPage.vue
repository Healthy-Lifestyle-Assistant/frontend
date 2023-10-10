<template>
    <metainfo>
		<template v-slot:title="{ content }">{{ content }}</template>
	</metainfo>

    <div>
        <ExerciseComponent></ExerciseComponent>
    </div>
    
    <div v-if="entities" class="d-flex flex-column">
        <div>
            <router-link to="/workouts" class="btn btn-info mb-4" role="button">Add Custom Exercise</router-link>
        </div>

        <div v-if="entities" class="d-flex flex-wrap">
            
            <div v-for="entity in entities" :key="entity.id" class="card w-25 mb-3 me-2 bg-dark text-info"
                style="min-width: 16rem;">
                <div class="card-body">
                    <div class="card-title">{{ entity.title }}</div>
                    <div v-if="entity.bodyParts" class="card-text mb-2">
                        <span v-for="bodyPart in entity.bodyParts" :key="bodyPart.id">{{ bodyPart.name }}&nbsp;</span>
                    </div>
                    <div class="d-flex justify-content-end">
                        <a href="#" class="btn btn-outline-info" target="_blank">Details</a>

                    </div>
                </div>
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
            entities: null,
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
        
        const res = await this.getDefaultExercisesApi();
        this.entities = res.body;

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
        },

        async getDefaultExercisesApi() {
            let URL = "/api/v1/exercises/default";

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
