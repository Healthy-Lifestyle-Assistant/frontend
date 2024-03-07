<template>
    <div class="card mb-3 me-3 p-3" style="width: 300px;">
        <h5 class="card-title">{{ hours }}:{{ minutes }} {{ title }}</h5>

        <h6 v-if="isCompleted" class="card-subtitle mb-4 text-success">Completed</h6>
        <h6 v-else class="card-subtitle mb-4 text-info">Todo</h6>

        <div v-if="isPausedBilling" class="text-warning mb-3">
            Subscription is paused. Please make a payment
        </div>

        <ButtonComponent
            v-if="!isCompleted && activityType === 'WORKOUT' && !isSingle"
            :isDisabled="isPausedBilling"
            title="Mark Exercises as Completed"
            style="width: 200px;"
            link="/"
            class="mb-3"/>

        <ButtonComponent
            v-if="!isCompleted"
            :isDisabled="isPausedBilling"
            style="width: 200px;"
            link="/" title="Mark as Completed"/>

        <ButtonComponent
            v-if="isCompleted && activityType === 'WORKOUT' && !isSingle"
            :isDisabled="isPausedBilling"
            title="Mark Exercises as Uncompleted"
            style="width: 200px;"
            link="/"
            class="mb-3"/>

        <ButtonComponent
            v-if="isCompleted"
            :isDisabled="isPausedBilling"
            style="width: 200px;"
            link="/" title="Mark as Uncompleted"/>

    </div>
</template>

<script>
import ButtonComponent from "@/shared/components/ButtonComponent.vue";

export default {
    name: "ActivityRowComponent",

    components: {
        ButtonComponent
    },

    props: {
        activityId: Number,
        activityType: String,
        isSingle: Boolean,
        isPausedBilling: Boolean,
        isCompleted: Boolean,
        title: String,
        date: String,
        hours: Number,
        minutes: Number
    }
}
</script>