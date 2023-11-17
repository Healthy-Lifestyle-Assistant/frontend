<template>
    <div class="card mb-5">
        <div class="card-body">
            <h5 class="card-title">{{ name }}</h5>

            <h6 class="card-subtitle mb-2 text-body-secondary">{{ isCustom ? "Custom" : "Default" }}</h6>

            <p v-if="description" class="card-text">{{ description }}</p>

            <div v-if="isCustom" class="d-flex justify-content-between mt-3 me-4">
                <a :href="generateLink()" class="btn btn-outline-secondary d-block me-3">Manage</a>
                <a :href="httpRef" class="btn btn-outline-secondary" target="_blank">Visit</a>
            </div>

            <div v-else class="d-flex justify-content-end me-4">
                <a :href="httpRef" class="btn btn-outline-secondary" target="_blank">Visit</a>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "ExerciseComponent",

    props: {
        id: Number,
        name: String,
        httpRef: String,
        description: String,
        isCustom: Boolean
    },

    methods: {
        generateLink() {
            if (this.isCustom) return `/workouts-manage-media/${this.id}`;
            else return "/";
        }
    }
}
</script>
