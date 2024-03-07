import {StringUtil} from "@/shared/util/StringUtil";

export class DateTimeFormatter {
    static formatDateTime(dayDto = {day: "", hours: 0, minutes: 0}) {
        let formatted = "";

        if (dayDto.day !== null) {
            formatted += StringUtil.upperCaseStringToRegular(dayDto.day) + " ";
        }

        let hours = dayDto.hours < 10 ? "0" + dayDto.hours : dayDto.hours;
        let minutes = dayDto.minutes < 10 ? "0" + dayDto.minutes : dayDto.minutes;

        formatted += `${hours}:${minutes}`;
        return formatted;
    }
}
