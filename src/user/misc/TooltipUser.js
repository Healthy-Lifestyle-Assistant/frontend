export class TooltipUser {
    static get USERNAME_TOOLTIP() {
        return "Username can include lower and upper-case letters, digits, and symbols: . - _\nLength must be between 5 and 255";
    }

    static get EMAIL_TOOLTIP() {
        return "Email can contain lower and upper-case letters, digits, and symbols: . - _\nLength must be between 7 and 60";
    }

    static get USERNAME_OR_EMAIL_TOOLTIP() {
        return TooltipUser.USERNAME_TOOLTIP + "\n" + TooltipUser.EMAIL_TOOLTIP;
    }

    static get FULL_NAME_TOOLTIP() {
        return "Full name can include lower and upper-case letters, and spaces\nLength must be between 2 and 50";
    }

    static get AGE_TOOLTIP() {
        return "Age must be between 16 and 120";
    }

    static get COUNTRY_TOOLTIP() {
        return "There is a list of the available countries";
    }

    static get PASSWORD_TOOLTIP() {
        return "Password can include lower and upper-case letters, digits, and symbols: . , - _ < > : ; ! ? # $ % ^ & * ( ) + =\nLength must be between 10 and 20";
    }
}