<template>
    <div class="card me-4 mb-4" style="min-width: 16rem; max-width: 16rem;">
        <div class="card-body">
            <h5 class="card-title">{{ name }}</h5>

            <h6 class="card-subtitle mb-2 text-body-secondary">{{ isCustom ? "Custom" : "Default" }}</h6>

            <p class="card-text">{{ description }}</p>


            <div v-if="isCustom" class="d-flex justify-content-between mb-3">
                <a :href="generateLink()" class="btn btn-outline-secondary d-block me-3">Manage</a>
                <a :href="httpRef" class="btn btn-outline-secondary" target="_blank">Visit Media</a>
            </div>

            <div v-else class="d-flex justify-content-end">
                <a :href="httpRef" class="btn btn-outline-secondary" target="_blank">Visit Media</a>
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
