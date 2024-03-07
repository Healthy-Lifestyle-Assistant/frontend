export class StringUtil {
    static truncateStringWithWordBoundary(inputString, maxLength) {
        if (inputString && inputString.length > maxLength) {
            const truncatedText = inputString.substring(0, maxLength);
            const lastSpaceIndex = truncatedText.lastIndexOf(' ');
            return lastSpaceIndex !== -1 ? truncatedText.substring(0, lastSpaceIndex) + '...' : truncatedText + '...';
        }
        return inputString;
    }

    static getStringOrNull(value) {
        if (value === null || value.trim() === "") {
            return null;
        }
        return value.trim();
    }

    static upperCaseStringToRegular(string = "ABC") {
        let formatted = string[0];
        formatted += (string.substring(1, string.length)).toLowerCase();
        return formatted;
    }
}