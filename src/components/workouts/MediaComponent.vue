<template>
    <div class="card me-4 mb-4" style="min-width: 26rem;">
        <div class="card-body">
			<h5 class="card-title">{{ name }}</h5>

			<h6 class="card-subtitle mb-2 text-body-secondary">{{ isCustom ? "Custom" : "Default" }}</h6>

			<p class="card-text">{{ description }}</p>

            <div class="d-flex justify-content-end">
                <a :href="httpRef" class="btn btn-primary" target="_blank">Visit Media</a>
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
    }
}
</script>
