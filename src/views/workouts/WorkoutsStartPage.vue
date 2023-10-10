<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div class="d-flex">
            <router-link to="" class="btn btn-primary me-4" role="button">Create Custom Workout</router-link>
            <router-link to="/workouts-exercises" class="btn btn-primary me-4" role="button">Exercises</router-link>
            <router-link to="" class="btn btn-primary me-4" role="button">Reminders</router-link>
        </div>

        <br><br>

        <div v-if="workouts" class="d-flex flex-wrap">

            <div v-for="workout in workouts" :key="workout.id">
                <WorkoutComponent :title="workout.title" :description="workout.description" :bodyParts="workout.bodyParts"
                    :type="workout.type" :exercises="workout.exercises" />
            </div>

        </div>

    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import WorkoutComponent from "../../components/workouts/WorkoutComponent.vue";

export default {
    name: "WorkoutsStartPage",

    setup() {
        useMeta({
            title: "Workouts Menu",
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
        this.$store.commit("setCurrentUrl", "/workouts-start-page");

        this.workouts = [
            {
                "id": 1,
                "title": "Workout Title 1",
                "description": "Workout Description 1",
                "bodyParts": [
                    {
                        "id": 1,
                        "name": "BodyPart1"
                    },
                    {
                        "id": 2,
                        "name": "BodyPart2"
                    },
                    {
                        "id": 3,
                        "name": "BodyPart3"
                    },
                    {
                        "id": 4,
                        "name": "BodyPart4"
                    }
                ],
                "type": "Default",
                "exercises": [
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
                    }
                ]
            },
            {
                "id": 2,
                "title": "Workout Title 2",
                "description": "Workout Description 2",
                "bodyParts": [
                    {
                        "id": 1,
                        "name": "BodyPart1"
                    },
                    {
                        "id": 2,
                        "name": "BodyPart2"
                    },
                    {
                        "id": 5,
                        "name": "BodyPart5"
                    },
                    {
                        "id": 6,
                        "name": "BodyPart6"
                    }
                ],
                "type": "Default",
                "exercises": [
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
                        "id": 3,
                        "title": "Exercise Title 3",
                        "description": "Exercise Description 3",
                        "bodyParts": [
                            {
                                "id": 5,
                                "name": "BodyPart5"
                            },
                            {
                                "id": 6,
                                "name": "BodyPart6"
                            }
                        ],
                        "type": "Default"
                    }
                ]
            },
            {
                "id": 3,
                "title": "Workout Title 3",
                "description": "Workout Description 3",
                "bodyParts": [
                    {
                        "id": 3,
                        "name": "BodyPart3"
                    },
                    {
                        "id": 4,
                        "name": "BodyPart4"
                    },
                    {
                        "id": 5,
                        "name": "BodyPart5"
                    }
                ],
                "type": "Default",
                "exercises": [
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
                ]
            }
        ];

        // const res = await this.getDefaultWorkouts();
        // this.workouts = res;
    },

    components: {
        WorkoutComponent
    },

    // methods: {
    // async getDefaultWorkouts() {
    // let URL = "/api/v1/workouts/default";

    // const res = await fetch(URL, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // });

    // const data = await res.json();

    // return {
    //     status: res.status,
    //     body: data
    // };
    // }
    // }

}
</script>
