<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div class="d-flex">
            <router-link to="" class="btn btn-primary me-4" role="button">Create Custom Workout</router-link>
            <router-link to="/workouts-exercises" class="btn btn-primary me-4" role="button">Exercises</router-link>
            <router-link to="" class="btn btn-primary me-4" role="button">Reminders</router-link>
            <router-link to="/workouts-media" class="btn btn-primary me-4" role="button">Media</router-link>
        </div>

        <br><br>

        <div v-if="workouts" class="d-flex flex-wrap">

            <div v-for="workout in workouts" :key="workout.id">
                <WorkoutComponent :title="workout.title" :description="workout.description" :bodyParts="workout.bodyParts"
                    :custom="workout.custom" :needsEquipment="workout.needsEquipment" :exercises="workout.exercises" />
            </div>

        </div>

    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import WorkoutComponent from "../../components/workouts/WorkoutComponent.vue";

export default {
    name: "WorkoutsPage",

    setup() {
        useMeta({
            title: "Healthy - Workouts",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            workouts: null,
            message: ""
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", "/workouts");

        const isTokenValid = await this.validateToken();

        if (isTokenValid) {
            this.$store.commit("setLogged", true);
            // 
        } else {
            try {
                this.$store.commit("setLogged", false);

                const res = await this.getDefaultWorkouts();

                if (res.status === 200) {
                    this.workouts = res.body;
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

        // this.workouts = [
        //     {
        //         "id": 1,
        //         "title": "Workout Title 1",
        //         "description": "Workout Description 1",
        //         "bodyParts": [
        //             {
        //                 "id": 1,
        //                 "name": "BodyPart1"
        //             },
        //             {
        //                 "id": 2,
        //                 "name": "BodyPart2"
        //             },
        //             {
        //                 "id": 3,
        //                 "name": "BodyPart3"
        //             },
        //             {
        //                 "id": 4,
        //                 "name": "BodyPart4"
        //             }
        //         ],
        //         "type": "Default",
        //         "exercises": [
        //             {
        //                 "id": 1,
        //                 "title": "Exercise Title 1",
        //                 "description": "Exercise Description 1",
        //                 "bodyParts": [
        //                     {
        //                         "id": 1,
        //                         "name": "BodyPart1"
        //                     },
        //                     {
        //                         "id": 2,
        //                         "name": "BodyPart2"
        //                     }
        //                 ],
        //                 "type": "Default"
        //             },
        //             {
        //                 "id": 2,
        //                 "title": "Exercise Title 2",
        //                 "description": "Exercise Description 2",
        //                 "bodyParts": [
        //                     {
        //                         "id": 3,
        //                         "name": "BodyPart3"
        //                     },
        //                     {
        //                         "id": 4,
        //                         "name": "BodyPart4"
        //                     }
        //                 ],
        //                 "type": "Default"
        //             }
        //         ]
        //     },
        //     {
        //         "id": 2,
        //         "title": "Workout Title 2",
        //         "description": "Workout Description 2",
        //         "bodyParts": [
        //             {
        //                 "id": 1,
        //                 "name": "BodyPart1"
        //             },
        //             {
        //                 "id": 2,
        //                 "name": "BodyPart2"
        //             },
        //             {
        //                 "id": 5,
        //                 "name": "BodyPart5"
        //             },
        //             {
        //                 "id": 6,
        //                 "name": "BodyPart6"
        //             }
        //         ],
        //         "type": "Default",
        //         "exercises": [
        //             {
        //                 "id": 1,
        //                 "title": "Exercise Title 1",
        //                 "description": "Exercise Description 1",
        //                 "bodyParts": [
        //                     {
        //                         "id": 1,
        //                         "name": "BodyPart1"
        //                     },
        //                     {
        //                         "id": 2,
        //                         "name": "BodyPart2"
        //                     }
        //                 ],
        //                 "type": "Default"
        //             },
        //             {
        //                 "id": 3,
        //                 "title": "Exercise Title 3",
        //                 "description": "Exercise Description 3",
        //                 "bodyParts": [
        //                     {
        //                         "id": 5,
        //                         "name": "BodyPart5"
        //                     },
        //                     {
        //                         "id": 6,
        //                         "name": "BodyPart6"
        //                     }
        //                 ],
        //                 "type": "Default"
        //             }
        //         ]
        //     },
        //     {
        //         "id": 3,
        //         "title": "Workout Title 3",
        //         "description": "Workout Description 3",
        //         "bodyParts": [
        //             {
        //                 "id": 3,
        //                 "name": "BodyPart3"
        //             },
        //             {
        //                 "id": 4,
        //                 "name": "BodyPart4"
        //             },
        //             {
        //                 "id": 5,
        //                 "name": "BodyPart5"
        //             }
        //         ],
        //         "type": "Default",
        //         "exercises": [
        //             {
        //                 "id": 2,
        //                 "title": "Exercise Title 2",
        //                 "description": "Exercise Description 2",
        //                 "bodyParts": [
        //                     {
        //                         "id": 3,
        //                         "name": "BodyPart3"
        //                     },
        //                     {
        //                         "id": 4,
        //                         "name": "BodyPart4"
        //                     }
        //                 ],
        //                 "type": "Default"
        //             },
        //             {
        //                 "id": 3,
        //                 "title": "Exercise Title 3",
        //                 "description": "Exercise Description 3",
        //                 "bodyParts": [
        //                     {
        //                         "id": 5,
        //                         "name": "BodyPart5"
        //                     }
        //                 ],
        //                 "type": "Default"
        //             }
        //         ]
        //     }
        // ];
    },

    components: {
        WorkoutComponent
    },

    methods: {
        async validateToken() {
            const token = localStorage.getItem("token");

            if (token === null || token === "") {
                return false;
            } else {
                // GET /api/v1/auth/validate
                return false;
            }
        },

        async getDefaultWorkouts() {
            let URL = "/api/v1/workouts/default";

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

}
</script>
