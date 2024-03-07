export class TooltipShared {
    static get TITLE_TOOLTIP() {
        return "Title can include lower and upper-case letters, digits, spaces, and symbols . , - ( ) /\nLength must be between 5 and 255";
    }

    static get DESCRIPTION_TOOLTIP() {
        return "Description can include lower and upper-case letters, digits, spaces, and symbols: . , - : ; ! ? ' \" # % ( ) + =\nLength must be between 5 and 255";
    }

    static get WEB_LINK() {
        return "Web link should start with http:// or https://";
    }

    static get FILTER_TITLE_TOOLTIP() {
        return "Title filter can include lower and upper-case letters, digits, and spaces\nLength of the filter must be between 3 and 255";
    }

    static get FILTER_DESCRIPTION_TOOLTIP() {
        return "Description filter can include lower and upper-case letters, digits, spaces, and symbols: . , - : ; ! ? ' \" # % ( ) + =\nLength of the filter must be between 3 and 255";
    }
}