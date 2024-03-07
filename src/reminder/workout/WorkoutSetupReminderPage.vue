<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex flex-column align-items-start">

        <div>
            <BreadcrumbWorkoutsComponent/>
            <AlertListComponent :alerts="alerts"/>
            <AlertComponent :message="message" :messageType="messageType"/>
        </div>

        <h4 class="mb-4 text-muted">Setup Reminder</h4>

        <p><i>Reminder will be set within your timezone. You can changes the timezone settings in your Preferences.</i>
        </p>

        <form @submit.prevent="onSubmitForm" class="mb-5 form-width">

            <label class="form-label" for="reminderType">Reminder Type<span class="span-color"> *</span></label>
            <select id="reminderType" class="form-select mb-4" aria-label="Default select example"
                    v-model="formReminderType" @change="onSelectReminderType" required>
                <option value="DAILY">Daily</option>
                <option value="DAY_AFTER_DAY">Day after day</option>
                <option value="DAYS">Days</option>
                <option value="ONCE">Once</option>
            </select>

            <!-- Daily or Day After Day -->
            <div v-if="isDailyOrDayAfterDayVisible" class="mb-4">
                <div class="form-label mb-3">Repeat Time</div>

                <div class="d-flex flex-row mb-4">
                    <!--                    <label class="form-label" for="daysOrDayAfterDayStartTime">-->
                    <!--                        Repeat Time<span class="span-color"> *</span></label>-->
                    <!--                    <input id="daysOrDayAfterDayStartTime" v-model="formDaysOrDayAfterDayStartTime" class="form-control"-->
                    <!--                           type="time" required>-->

                    <div class="me-4">
                        <label class="form-label" for="formDailyOrDayAfterDayHours">
                            Hours<span class="span-color"> *</span></label>
                        <select id="formDailyOrDayAfterDayHours" class="form-select mb-4"
                                aria-label="Default select example"
                                v-model="formDailyOrDayAfterDayHours" style="width: 100px;" required>
                            <option v-for="option in formHoursOptions" :value="option.value" :key="option.value">
                                {{ option.label }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="form-label" for="formDailyOrDayAfterDayMinutes">
                            Minutes<span class="span-color"> *</span></label>
                        <select id="formDailyOrDayAfterDayMinutes" class="form-select mb-4"
                                aria-label="Default select example"
                                v-model="formDailyOrDayAfterDayMinutes" style="width: 100px;" required>
                            <option v-for="option in formMinutesOptions" :value="option.value" :key="option.value">
                                {{ option.label }}
                            </option>
                        </select>
                    </div>

                </div>
            </div>

            <!-- Days -->
            <div v-if="isDaysVisible" class="mb-4">
                <div class="form-label mb-3">Repeat Days</div>

                <!-- Monday -->
                <div class="form-check mb-4">
                    <div>
                        <label class="form-check-label" for="dayMonday">Monday</label>
                        <input id="dayMonday" v-model="formDayMondayCheckbox" class="form-check-input" type="checkbox"
                               @change="onDayCheckboxChange(DayEnum.MONDAY)">
                    </div>
                    <!--                    <div v-if="isDayMondayTimeVisible">-->
                    <!--                        <label class="form-label" for="dayMondayTime">-->
                    <!--                            Repeat Time<span class="span-color"> *</span></label>-->
                    <!--                        <input id="dayMondayTime" v-model="formDayMondayTime" class="form-control" type="time" required>-->
                    <!--                    </div>-->

                    <div v-if="isDayMondayTimeVisible" class="d-flex flex-row">
                        <div class="me-4">
                            <label class="form-label" for="formDayMondayHours">
                                Hours<span class="span-color"> *</span></label>
                            <select id="formDayMondayHours" class="form-select mb-4"
                                    aria-label="Default select example"
                                    v-model="formDayMondayHours" style="width: 100px;" required>
                                <option v-for="option in formHoursOptions" :value="option.value" :key="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="form-label" for="formDayMondayMinutes">
                                Minutes<span class="span-color"> *</span></label>
                            <select id="formDayMondayMinutes" class="form-select mb-4"
                                    aria-label="Default select example"
                                    v-model="formDayMondayMinutes" style="width: 100px;" required>
                                <option v-for="option in formMinutesOptions" :value="option.value" :key="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Tuesday -->
                <div class="form-check mb-4">
                    <div>
                        <label class="form-check-label" for="dayTuesday">Tuesday</label>
                        <input id="dayTuesday" v-model="formDayTuesdayCheckbox" class="form-check-input" type="checkbox"
                               @change="onDayCheckboxChange(DayEnum.TUESDAY)">
                    </div>
                    <!--                    <div v-if="isDayTuesdayTimeVisible">-->
                    <!--                        <label class="form-label" for="dayTuesdayTime">-->
                    <!--                            Repeat Time<span class="span-color"> *</span></label>-->
                    <!--                        <input id="dayTuesdayTime" v-model="formDayTuesdayTime" class="form-control" type="time"-->
                    <!--                               required>-->
                    <!--                    </div>-->
                    <div v-if="isDayTuesdayTimeVisible" class="d-flex flex-row">
                        <div class="me-4">
                            <label class="form-label" for="formDayTuesdayHours">
                                Hours<span class="span-color"> *</span></label>
                            <select id="formDayTuesdayHours" class="form-select mb-4"
                                    aria-label="Default select example"
                                    v-model="formDayTuesdayHours" style="width: 100px;" required>
                                <option v-for="option in formHoursOptions" :value="option.value" :key="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="form-label" for="formDayTuesdayMinutes">
                                Minutes<span class="span-color"> *</span></label>
                            <select id="formDayTuesdayMinutes" class="form-select mb-4"
                                    aria-label="Default select example"
                                    v-model="formDayTuesdayMinutes" style="width: 100px;" required>
                                <option v-for="option in formMinutesOptions" :value="option.value" :key="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Wednesday -->
                <div class="form-check mb-4">
                    <div>
                        <label class="form-check-label" for="dayWednesday">Wednesday</label>
                        <input id="dayWednesday" v-model="formDayWednesdayCheckbox" class="form-check-input"
                               type="checkbox"
                               @change="onDayCheckboxChange(DayEnum.WEDNESDAY)">
                    </div>
                    <!--                    <div v-if="isDayWednesdayTimeVisible">-->
                    <!--                        <label class="form-label" for="dayWednesdayTime">-->
                    <!--                            Repeat Time<span class="span-color"> *</span></label>-->
                    <!--                        <input id="dayWednesdayTime" v-model="formDayWednesdayTime" class="form-control" type="time"-->
                    <!--                               required>-->
                    <!--                    </div>-->
                    <div v-if="isDayWednesdayTimeVisible" class="d-flex flex-row">
                        <div class="me-4">
                            <label class="form-label" for="formDayWednesdayHours">
                                Hours<span class="span-color"> *</span></label>
                            <select id="formDayWednesdayHours" class="form-select mb-4"
                                    aria-label="Default select example"
                                    v-model="formDayWednesdayHours" style="width: 100px;" required>
                                <option v-for="option in formHoursOptions" :value="option.value" :key="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="form-label" for="formDayWednesdayMinutes">
                                Minutes<span class="span-color"> *</span></label>
                            <select id="formDayWednesdayMinutes" class="form-select mb-4"
                                    aria-label="Default select example"
                                    v-model="formDayWednesdayMinutes" style="width: 100px;" required>
                                <option v-for="option in formMinutesOptions" :value="option.value" :key="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Thursday -->
                <div class="form-check mb-4">
                    <div>
                        <label class="form-check-label" for="dayThursday">Thursday</label>
                        <input id="dayThursday" v-model="formDayThursdayCheckbox" class="form-check-input"
                               type="checkbox"
                               @change="onDayCheckboxChange(DayEnum.THURSDAY)">
                    </div>
                    <!--                    <div v-if="isDayThursdayTimeVisible">-->
                    <!--                        <label class="form-label" for="dayThursdayTime">-->
                    <!--                            Repeat Time<span class="span-color"> *</span></label>-->
                    <!--                        <input id="dayThursdayTime" v-model="formDayThursdayTime" class="form-control" type="time"-->
                    <!--                               required>-->
                    <!--                    </div>-->
                    <div v-if="isDayThursdayTimeVisible" class="d-flex flex-row">
                        <div class="me-4">
                            <label class="form-label" for="formDayThursdayHours">
                                Hours<span class="span-color"> *</span></label>
                            <select id="formDayThursdayHours" class="form-select mb-4"
                                    aria-label="Default select example"
                                    v-model="formDayThursdayHours" style="width: 100px;" required>
                                <option v-for="option in formHoursOptions" :value="option.value" :key="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="form-label" for="formDayThursdayMinutes">
                                Minutes<span class="span-color"> *</span></label>
                            <select id="formDayThursdayMinutes" class="form-select mb-4"
                                    aria-label="Default select example"
                                    v-model="formDayThursdayMinutes" style="width: 100px;" required>
                                <option v-for="option in formMinutesOptions" :value="option.value" :key="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Friday -->
                <div class="form-check mb-4">
                    <div>
                        <label class="form-check-label" for="dayFriday">Friday</label>
                        <input id="dayFriday" v-model="formDayFridayCheckbox" class="form-check-input" type="checkbox"
                               @change="onDayCheckboxChange(DayEnum.FRIDAY)">
                    </div>
                    <!--                    <div v-if="isDayFridayTimeVisible">-->
                    <!--                        <label class="form-label" for="dayFridayTime">-->
                    <!--                            Repeat Time<span class="span-color"> *</span></label>-->
                    <!--                        <input id="dayFridayTime" v-model="formDayFridayTime" class="form-control" type="time" required>-->
                    <!--                    </div>-->
                    <div v-if="isDayFridayTimeVisible" class="d-flex flex-row">
                        <div class="me-4">
                            <label class="form-label" for="formDayFridayHours">
                                Hours<span class="span-color"> *</span></label>
                            <select id="formDayFridayHours" class="form-select mb-4"
                                    aria-label="Default select example"
                                    v-model="formDayFridayHours" style="width: 100px;" required>
                                <option v-for="option in formHoursOptions" :value="option.value" :key="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="form-label" for="formDayFridayMinutes">
                                Minutes<span class="span-color"> *</span></label>
                            <select id="formDayFridayMinutes" class="form-select mb-4"
                                    aria-label="Default select example"
                                    v-model="formDayFridayMinutes" style="width: 100px;" required>
                                <option v-for="option in formMinutesOptions" :value="option.value" :key="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Saturday -->
                <div class="form-check mb-4">
                    <div>
                        <label class="form-check-label" for="daySaturday">Saturday</label>
                        <input id="daySaturday" v-model="formDaySaturdayCheckbox" class="form-check-input"
                               type="checkbox"
                               @change="onDayCheckboxChange(DayEnum.SATURDAY)">
                    </div>
                    <!--                    <div v-if="isDaySaturdayTimeVisible">-->
                    <!--                        <label class="form-label" for="daySaturdayTime">-->
                    <!--                            Repeat Time<span class="span-color"> *</span></label>-->
                    <!--                        <input id="daySaturdayTime" v-model="formDaySaturdayTime" class="form-control" type="time"-->
                    <!--                               required>-->
                    <!--                    </div>-->
                    <div v-if="isDaySaturdayTimeVisible" class="d-flex flex-row">
                        <div class="me-4">
                            <label class="form-label" for="formDaySaturdayHours">
                                Hours<span class="span-color"> *</span></label>
                            <select id="formDaySaturdayHours" class="form-select mb-4"
                                    aria-label="Default select example"
                                    v-model="formDaySaturdayHours" style="width: 100px;" required>
                                <option v-for="option in formHoursOptions" :value="option.value" :key="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="form-label" for="formDaySaturdayMinutes">
                                Minutes<span class="span-color"> *</span></label>
                            <select id="formDaySaturdayMinutes" class="form-select mb-4"
                                    aria-label="Default select example"
                                    v-model="formDaySaturdayMinutes" style="width: 100px;" required>
                                <option v-for="option in formMinutesOptions" :value="option.value" :key="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Sunday -->
                <div class="form-check mb-4">
                    <div>
                        <label class="form-check-label" for="daySunday">Sunday</label>
                        <input id="daySunday" v-model="formDaySundayCheckbox" class="form-check-input" type="checkbox"
                               @change="onDayCheckboxChange(DayEnum.SUNDAY)">
                    </div>
                    <!--                    <div v-if="isDaySundayTimeVisible">-->
                    <!--                        <label class="form-label" for="daySundayTime">-->
                    <!--                            Repeat Time<span class="span-color"> *</span></label>-->
                    <!--                        <input id="daySundayTime" v-model="formDaySundayTime" class="form-control" type="time" required>-->
                    <!--                    </div>-->
                    <div v-if="isDaySundayTimeVisible" class="d-flex flex-row">
                        <div class="me-4">
                            <label class="form-label" for="formDaySundayHours">
                                Hours<span class="span-color"> *</span></label>
                            <select id="formDaySundayHours" class="form-select mb-4"
                                    aria-label="Default select example"
                                    v-model="formDaySundayHours" style="width: 100px;" required>
                                <option v-for="option in formHoursOptions" :value="option.value" :key="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="form-label" for="formDaySundayMinutes">
                                Minutes<span class="span-color"> *</span></label>
                            <select id="formDaySundayMinutes" class="form-select mb-4"
                                    aria-label="Default select example"
                                    v-model="formDaySundayMinutes" style="width: 100px;" required>
                                <option v-for="option in formMinutesOptions" :value="option.value" :key="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Once -->
            <div v-if="isOnceVisible" class="mb-4">
                <label class="form-label" for="formOnceDay">Repeat Day<span class="span-color"> *</span></label>
                <select id="formOnceDay" class="form-select mb-4" aria-label="Default select example"
                        v-model="formOnceDay" required>
                    <option value="MONDAY">Monday</option>
                    <option value="TUESDAY">Tuesday</option>
                    <option value="WEDNESDAY">Wednesday</option>
                    <option value="THURSDAY">Thursday</option>
                    <option value="FRIDAY">Friday</option>
                    <option value="SATURDAY">Saturday</option>
                    <option value="SUNDAY">Sunday</option>
                </select>

                <!--                <div class="mb-4">-->
                <!--                    <label class="form-label" for="onceTime">Repeat Time<span class="span-color"> *</span></label>-->
                <!--                    <input id="onceTime" v-model="formOnceTime" class="form-control" type="time" required>-->
                <!--                </div>-->

                <div class="d-flex flex-row">
                    <div class="me-4">
                        <label class="form-label" for="formOnceHours">
                            Hours<span class="span-color"> *</span></label>
                        <select id="formOnceHours" class="form-select mb-4"
                                aria-label="Default select example"
                                v-model="formOnceHours" style="width: 100px;" required>
                            <option v-for="option in formHoursOptions" :value="option.value" :key="option.value">
                                {{ option.label }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="form-label" for="formOnceMinutes">
                            Minutes<span class="span-color"> *</span></label>
                        <select id="formOnceMinutes" class="form-select mb-4"
                                aria-label="Default select example"
                                v-model="formOnceMinutes" style="width: 100px;" required>
                            <option v-for="option in formMinutesOptions" :value="option.value" :key="option.value">
                                {{ option.label }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Other Fields -->
            <div class="mb-4">
                <label class="form-label" for="startDate">Start Date<span class="span-color"> *</span></label>
                <input id="startDate" v-model="formStartDate" class="form-control" type="date" required>
            </div>

            <div class="mb-4">
                <input :disabled="isApplyDaysCheckboxDisabled" id="applyDaysCheckbox" v-model="formApplyDaysCheckbox"
                       class="form-check-input me-1" type="checkbox" @change="onApplyDaysCheckboxChange">
                <label class="form-label" for="applyDays">Apply days since start date
                    <span v-if="isApplyDaysCheckboxDisabled"> (disabled)</span>
                </label>
                <input v-if="!isApplyDaysDisabled" id="applyDays" type="number" min="1" max="365" step="1"
                       v-model="formApplyDays" class="form-control">
            </div>

            <div class="mb-4">
                <input :disabled="isEndDateCheckboxDisabled" id="endDateCheckbox" v-model="formEndDateCheckbox"
                       class="form-check-input me-1" type="checkbox" @change="onEndDateCheckboxChange">
                <label class="form-label" for="endDate">End Date
                    <span v-if="isEndDateCheckboxDisabled"> (disabled)</span>
                </label>
                <input v-if="!isEndDateDisabled" id="endDate" v-model="formEndDate" class="form-control"
                       type="date">
            </div>

            <label class="form-label" for="notifyBeforeInMinutes">Notify Before</label>
            <select id="notifyBeforeInMinutes" class="form-select mb-4" aria-label="Default select example"
                    v-model="formNotifyBeforeInMinutes">
                <option value="10">10 min</option>
                <option value="15">15 min</option>
                <option value="30">30 min</option>
                <option value="60">60 min</option>
            </select>

            <div>
                <span class="span-color">*</span> <i>Required fields</i>
            </div>

            <button @click.prevent="onClearForm" class="btn btn-outline-secondary mt-4 me-2">Clear</button>
            <button type="submit" class="btn btn-secondary mt-4">Setup</button>
            <br><br>
        </form>
    </div>
</template>

<script>
import {useMeta} from "vue-meta";
import {AuthUtil} from "@/auth/misc/AuthUtil";
import {AlertMessageShared} from "@/shared/util/AlertMessageShared";
import {ExceptionUtil} from "@/shared/util/ExceptionUtil";
import {ReminderTypeEnum} from "@/reminder/shared/misc/ReminderTypeEnum";
import {UrlCalendar} from "@/reminder/shared/misc/UrlCalendar";
import {DayEnum} from "@/reminder/shared/misc/DayEnum";
import AlertComponent from "@/shared/components/AlertComponent.vue";
import AlertListComponent from "@/shared/components/AlertListComponent.vue";
import BreadcrumbWorkoutsComponent from "@/activity/workout/components/BreadcrumbWorkoutsComponent.vue";

export default {
    name: "WorkoutSetupReminderPage",
    computed: {
        DayEnum() {
            return DayEnum
        }
    },

    components: {
        AlertComponent,
        AlertListComponent,
        BreadcrumbWorkoutsComponent
    },

    setup() {
        useMeta({
            title: "Setup Workout Reminder",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    data() {
        return {
            formHoursOptions: [
                {value: "07", label: "07 AM"},
                {value: "08", label: "08 AM"},
                {value: "09", label: "09 AM"},
                {value: "10", label: "10 AM"},
                {value: "11", label: "11 AM"},
                {value: "12", label: "12 PM"},
                {value: "13", label: "01 PM"},
                {value: "14", label: "02 PM"},
                {value: "15", label: "03 PM"},
                {value: "16", label: "04 PM"},
                {value: "17", label: "05 PM"},
                {value: "18", label: "06 PM"},
                {value: "19", label: "07 PM"},
                {value: "20", label: "08 PM"},
                {value: "21", label: "09 PM"},
                {value: "22", label: "10 PM"},
                {value: "23", label: "11 PM"},
                {value: "00", label: "12 AM"},
                {value: "01", label: "01 AM"},
                {value: "02", label: "02 AM"},
                {value: "03", label: "03 AM"},
                {value: "04", label: "04 AM"},
                {value: "05", label: "05 AM"},
                {value: "06", label: "06 AM"}
            ],

            formMinutesOptions: [
                {value: "00", label: ":00"},
                {value: "10", label: ":10"},
                {value: "15", label: ":15"},
                {value: "20", label: ":20"},
                {value: "25", label: ":25"},
                {value: "30", label: ":30"},
                {value: "35", label: ":35"},
                {value: "40", label: ":40"},
                {value: "45", label: ":45"},
                {value: "50", label: ":50"}
            ],

            formReminderType: null,
            formStartDate: null,
            formEndDate: null,
            formEndDateCheckbox: null,
            formApplyDays: null,
            formApplyDaysCheckbox: null,
            formNotifyBeforeInMinutes: null,
            // formDaysOrDayAfterDayStartTime: null,

            formDailyOrDayAfterDayHours: null,
            formDailyOrDayAfterDayMinutes: null,

            formOnceDay: null,
            formOnceHours: null,
            formOnceMinutes: null,
            // formOnceTime: null,

            formDayMondayCheckbox: null,
            formDayMondayHours: null,
            formDayMondayMinutes: null,
            // formDayMondayTime: null,
            formDayTuesdayCheckbox: null,
            formDayTuesdayHours: null,
            formDayTuesdayMinutes: null,
            // formDayTuesdayTime: null,
            formDayWednesdayCheckbox: null,
            formDayWednesdayHours: null,
            formDayWednesdayMinutes: null,
            // formDayWednesdayTime: null,
            formDayThursdayCheckbox: null,
            formDayThursdayHours: null,
            formDayThursdayMinutes: null,
            // formDayThursdayTime: null,
            formDayFridayCheckbox: null,
            formDayFridayHours: null,
            formDayFridayMinutes: null,
            // formDayFridayTime: null,
            formDaySaturdayCheckbox: null,
            formDaySaturdayHours: null,
            formDaySaturdayMinutes: null,
            // formDaySaturdayTime: null,
            formDaySundayCheckbox: null,
            formDaySundayHours: null,
            formDaySundayMinutes: null,
            // formDaySundayTime: null,

            isDailyOrDayAfterDayVisible: false,
            isDaysVisible: false,
            isOnceVisible: false,

            isDayMondayTimeVisible: false,
            isDayTuesdayTimeVisible: false,
            isDayWednesdayTimeVisible: false,
            isDayThursdayTimeVisible: false,
            isDayFridayTimeVisible: false,
            isDaySaturdayTimeVisible: false,
            isDaySundayTimeVisible: false,

            isApplyDaysDisabled: true,
            isApplyDaysCheckboxDisabled: false,
            isEndDateDisabled: true,
            isEndDateCheckboxDisabled: false,

            message: null,
            messageType: null,
            alerts: []
        };
    },

    async created() {
        this.$store.commit(
            "setCurrentUrl", `/workouts-setup-reminder/${this.$route.params.workoutId}`);
        const token = await AuthUtil.getAndValidateToken(this);

        if (!token) {
            AuthUtil.redirectToLoginSessionExpired(this);
        } else {
            this.$store.commit("setLogged", true);
        }
    },

    methods: {
        async onSubmitForm() {
            let days = this.getDays();
            let applyDaysOrEndDate = this.getApplyDaysOrEndDate();

            const requestDto = {
                workoutId: this.$route.params.workoutId,
                reminderType: this.formReminderType,
                startDate: this.formStartDate,
                endDate: applyDaysOrEndDate["endDate"],
                applyDays: applyDaysOrEndDate["applyDays"],
                notifyBeforeInMinutes: this.formNotifyBeforeInMinutes,
                days: days
            };

            const token = AuthUtil.getToken();
            const response = await this.createWorkoutReminder(requestDto, token);
            if (response.status === 201) {
                this.workout = response.body;
                this.onClearForm();
                this.messageType = AlertMessageShared.SUCCESS;
                this.message = AlertMessageShared.CREATED_SUCCESSFULLY;
            } else if (response.status === 401) {
                AuthUtil.on401(this);
            } else {
                this.message = null;
                this.messageType = null;
                this.alerts = ExceptionUtil.buildAlertsList(response.body, AlertMessageShared.WARNING);
            }
        },

        onClearForm() {
            this.formReminderType = null;
            this.formStartDate = null;
            this.formEndDate = null;
            this.formEndDateCheckbox = null;
            this.formApplyDays = null;
            this.formApplyDaysCheckbox = null;
            this.formNotifyBeforeInMinutes = null;

            this.formDailyOrDayAfterDayHours = null;
            this.formDailyOrDayAfterDayMinutes = null;

            this.formOnceDay = null;
            this.formOnceHours = null;
            this.formOnceMinutes = null;

            this.formDayMondayCheckbox = null;
            this.formDayMondayHours = null;
            this.formDayMondayMinutes = null;
            this.formDayTuesdayCheckbox = null;
            this.formDayTuesdayHours = null;
            this.formDayTuesdayMinutes = null;
            this.formDayWednesdayCheckbox = null;
            this.formDayWednesdayHours = null;
            this.formDayWednesdayMinutes = null;
            this.formDayThursdayCheckbox = null;
            this.formDayThursdayHours = null;
            this.formDayThursdayMinutes = null;
            this.formDayFridayCheckbox = null;
            this.formDayFridayHours = null;
            this.formDayFridayMinutes = null;
            this.formDaySaturdayCheckbox = null;
            this.formDaySaturdayHours = null;
            this.formDaySaturdayMinutes = null;
            this.formDaySundayCheckbox = null;
            this.formDaySundayHours = null;
            this.formDaySundayMinutes = null;

            this.isDailyOrDayAfterDayVisible = false;
            this.isDaysVisible = false;
            this.isOnceVisible = false;

            this.isDayMondayTimeVisible = false;
            this.isDayTuesdayTimeVisible = false;
            this.isDayWednesdayTimeVisible = false;
            this.isDayThursdayTimeVisible = false;
            this.isDayFridayTimeVisible = false;
            this.isDaySaturdayTimeVisible = false;
            this.isDaySundayTimeVisible = false;

            this.isApplyDaysCheckboxDisabled = false;
            this.isApplyDaysDisabled = true;
            this.isEndDateCheckboxDisabled = false;
            this.isEndDateDisabled = true;

            this.message = null;
            this.messageType = null;
            this.alerts = [];
        },

        onSelectReminderType() {
            if (this.formReminderType === ReminderTypeEnum.DAILY
                || this.formReminderType === ReminderTypeEnum.DAY_AFTER_DAY) {
                this.isDailyOrDayAfterDayVisible = true;
                this.isDaysVisible = false;
                this.isOnceVisible = false;
            }

            if (this.formReminderType === ReminderTypeEnum.DAYS) {
                this.isDailyOrDayAfterDayVisible = false;
                this.isDaysVisible = true;
                this.isOnceVisible = false;
            }

            if (this.formReminderType === ReminderTypeEnum.ONCE) {
                this.isDailyOrDayAfterDayVisible = false;
                this.isDaysVisible = false;
                this.isOnceVisible = true;
            }
        },

        onDayCheckboxChange(day) {
            if (day === DayEnum.MONDAY) {
                this.isDayMondayTimeVisible = !this.isDayMondayTimeVisible;
            }
            if (day === DayEnum.TUESDAY) {
                this.isDayTuesdayTimeVisible = !this.isDayTuesdayTimeVisible;
            }
            if (day === DayEnum.WEDNESDAY) {
                this.isDayWednesdayTimeVisible = !this.isDayWednesdayTimeVisible;
            }
            if (day === DayEnum.THURSDAY) {
                this.isDayThursdayTimeVisible = !this.isDayThursdayTimeVisible;
            }
            if (day === DayEnum.FRIDAY) {
                this.isDayFridayTimeVisible = !this.isDayFridayTimeVisible;
            }
            if (day === DayEnum.SATURDAY) {
                this.isDaySaturdayTimeVisible = !this.isDaySaturdayTimeVisible;
            }
            if (day === DayEnum.SUNDAY) {
                this.isDaySundayTimeVisible = !this.isDaySundayTimeVisible;
            }
        },

        getDays() {
            let days = [];

            if (this.formReminderType === ReminderTypeEnum.DAYS) {
                if (this.formDayMondayCheckbox) {
                    let day = {
                        day: DayEnum.MONDAY,
                        hours: this.formDayMondayHours,
                        minutes: this.formDayMondayMinutes
                    }
                    days.push(day);
                }
                if (this.formDayTuesdayCheckbox) {
                    let day = {
                        day: DayEnum.TUESDAY,
                        hours: this.formDayTuesdayHours,
                        minutes: this.formDayTuesdayMinutes
                    }
                    days.push(day);
                }
                if (this.formDayWednesdayCheckbox) {
                    let day = {
                        day: DayEnum.WEDNESDAY,
                        hours: this.formDayWednesdayHours,
                        minutes: this.formDayWednesdayMinutes
                    }
                    days.push(day);
                }
                if (this.formDayThursdayCheckbox) {
                    let day = {
                        day: DayEnum.THURSDAY,
                        hours: this.formDayThursdayHours,
                        minutes: this.formDayThursdayMinutes
                    }
                    days.push(day);
                }
                if (this.formDayFridayCheckbox) {
                    let day = {
                        day: DayEnum.FRIDAY,
                        hours: this.formDayFridayHours,
                        minutes: this.formDayFridayMinutes
                    }
                    days.push(day);
                }
                if (this.formDaySaturdayCheckbox) {
                    let day = {
                        day: DayEnum.SATURDAY,
                        hours: this.formDaySaturdayHours,
                        minutes: this.formDaySaturdayMinutes
                    }
                    days.push(day);
                }
                if (this.formDaySundayCheckbox) {
                    let day = {
                        day: DayEnum.SUNDAY,
                        hours: this.formDaySundayHours,
                        minutes: this.formDaySundayMinutes
                    }
                    days.push(day);
                }
            }

            if (this.formReminderType === ReminderTypeEnum.ONCE) {
                let day = {
                    day: this.formOnceDay,
                    hours: this.formOnceHours,
                    minutes: this.formOnceMinutes
                }
                days.push(day);
            }

            if (this.formReminderType === ReminderTypeEnum.DAILY
                || this.formReminderType === ReminderTypeEnum.DAY_AFTER_DAY) {
                let day = {
                    day: null,
                    hours: this.formDailyOrDayAfterDayHours,
                    minutes: this.formDailyOrDayAfterDayMinutes
                }
                days.push(day);
            }

            return days;
        },

        onApplyDaysCheckboxChange() {
            this.isApplyDaysDisabled = !this.isApplyDaysDisabled;
            this.isEndDateCheckboxDisabled = !this.isApplyDaysDisabled;
        },

        onEndDateCheckboxChange() {
            this.isEndDateDisabled = !this.isEndDateDisabled;
            this.isApplyDaysCheckboxDisabled = !this.isEndDateDisabled;
        },

        getApplyDaysOrEndDate() {
            let obj = {
                applyDays: null,
                endDate: null
            }

            if (!this.isApplyDaysCheckboxDisabled && this.isEndDateCheckboxDisabled) {
                obj["applyDays"] = this.formApplyDays;
            }

            if (!this.isEndDateCheckboxDisabled && this.isApplyDaysCheckboxDisabled) {
                obj["endDate"] = this.formEndDate;
            }

            return obj;
        },

        async createWorkoutReminder(requestBody, token) {
            const response = await fetch(UrlCalendar.WORKOUTS_REMINDERS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();
            return {
                status: response.status,
                body: data
            };
        },
    }
}
</script>