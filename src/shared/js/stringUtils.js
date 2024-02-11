export function truncateStringWithWordBoundary(inputString, maxLength) {
    if (inputString && inputString.length > maxLength) {
        const truncatedText = inputString.substring(0, maxLength);
        const lastSpaceIndex = truncatedText.lastIndexOf(' ');
        return lastSpaceIndex !== -1 ? truncatedText.substring(0, lastSpaceIndex) + '...' : truncatedText + '...';
    }
    return inputString;
}

export function getStringOrNull(value) {
    if (value === null || value.trim() == "") {
        return null;
    }
    return value.trim();
}
