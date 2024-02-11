<template>
    <div class="text-center tooltip-question-mark" data-bs-toggle="tooltip" data-bs-placement="left" :title="text">
        ?
    </div>
</template>

<script>
export default {
    name: "TooltipComponent",

    props: {
        text: String
    }
};
</script>