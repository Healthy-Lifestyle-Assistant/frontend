<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <AlertComponent :isUnlogged="isUnlogged" :isError="isError" :message="message" />

        <div>
            <BreadcrumbWorkoutsComponent />
            <br>
            <router-link to="/workouts-create-exercise" class="btn btn-outline-secondary" role="button">New Exercise</router-link>
            <br><br>
        </div>

        <div v-if="this.exercise != null">
            <div class="card me-4 mb-4" style="min-width: 48rem; max-width: 48rem;">
                <div class="card-body">

                    <div class="row">
                        <div class="col-md-6 order-md-first">
                            <h5 class="card-title">{{ exercise && exercise.title }}</h5>
                        </div>

                        <div class="col-md-6 d-flex align-items-center justify-content-end">
                            <h6 class="card-subtitle">{{ exercise && exercise.isCustom ? "Custom" : "Default" }}</h6>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 order-md-first">
                            <p class="card-text" style="text-align: justify;">{{ exercise && exercise.description }}</p>
                        </div>

                        <div class="col-md-6 d-flex justify-content-end">
                            <div v-if="exercise && exercise.bodyParts" class="card-text mb-2">
                                <span v-for="bodyPart in exercise.bodyParts" :key="bodyPart.id"><small>{{ bodyPart.name.toLowerCase()
                                }}</small>&nbsp;</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div v-for="elt in exercise && exercise.httpRefs" :key="elt.id">
                <MediaComponent :name="elt.name" :description="elt.description" :isCustom="elt.custom" :httpRef="elt.ref" />
            </div>
        </div>

        <div v-if="this.exercise == null">
            <h5>Exercise is unavailable</h5>
        </div>

    </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { getAndValidateToken } from "../common/common.js";
import BreadcrumbWorkoutsComponent from "../../components/workouts/BreadcrumbWorkoutsComponent.vue";
import MediaComponent from "../../components/workouts/MediaComponent.vue";
import AlertComponent from "../../components/common/AlertComponent.vue";

export default {
    name: "DefaultExerciseDetailsPage",

    setup() {
        useMeta({
            title: "Healthy - Default Exercise Details",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            exercise: null,
            message: ""
        };
    },

    async created() {
        this.$store.commit("setCurrentUrl", `/workouts-exercise-details/default/${this.$route.params.id}`);

        const token = await getAndValidateToken();

        if (!token) {
            this.$store.commit("setLogged", false);
            this.message = "You are unlogged";
        }else{
            this.$store.commit("setLogged", true);
        }

        try {
            let res = await this.getDefaultExercise();
            if(res.status == 200) this.exercise = res.body;
        } catch (error) {
            this.message = `An error occurred (${error})`;
        }

    },

    components: {
        BreadcrumbWorkoutsComponent,
        MediaComponent,
        AlertComponent
    },

    computed: {
        isError() {
            return this.message.includes("error");
        },

        isUnlogged() {
            return this.message.includes("unlogged");
        }
    },

     methods: {
        async getDefaultExercise() {
            let URL = `/api/v1/workouts/exercises/default/${this.$route.params.id}`;

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