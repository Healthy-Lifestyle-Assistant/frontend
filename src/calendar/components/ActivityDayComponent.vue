<template>
    <div class="mb-4">
        <div class="mb-3" style="font-weight: bold; font-size: 18px;">
            {{ dayDate !== null ? dayDate : "" }}
            {{ dayOfWeek !== null ? StringUtil.upperCaseStringToRegular(dayOfWeek) : "" }}
        </div>

        <div v-if="activities && activities.length > 0">
            <div v-for="(activity, index) in activities" :key="index">
                <ActivityRowComponent
                    :activityId="activity.activityId"
                    :activityType="activity.activityType"
                    :isSingle="activity.isSingle"
                    :isPausedBilling="activity.isPausedBilling"
                    :isCompleted="activity.isCompleted"
                    :title="activity.title"
                    :date="activity.date"
                    :hours="activity.hours"
                    :minutes="activity.minutes"
                />
            </div>
        </div>
    </div>

</template>

<script>
import {StringUtil} from "@/shared/util/StringUtil";
import ActivityRowComponent from "@/calendar/components/ActivityRowComponent.vue";

export default {
    name: "ActivityDayComponent",
    computed: {
        StringUtil() {
            return StringUtil
        }
    },

    components: {
        ActivityRowComponent
    },

    props: {
        dayDate: String,
        dayOfWeek: String,
        activities: Array
    }
}
</script>