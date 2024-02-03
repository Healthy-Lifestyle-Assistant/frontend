<template>
    <div class="card mb-3 me-3 health-component-width">
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
            <p v-if="description" class="card-text">{{ description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "HealthComponent",

    props: {
        title: String,
        description: String
    }
}
</script>
