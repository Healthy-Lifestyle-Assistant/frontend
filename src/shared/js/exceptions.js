export function buildAlertsList(obj, messageType) {
    let alertsList = [];
    if (obj === null) {
        let emptyAlert = {};
        emptyAlert["Unknown"] = "Exception occured";
        emptyAlert["keyName"] = "Unknown";
        emptyAlert["messageType"] = messageType;
        alertsList.push(emptyAlert);
    } else {
        for (const key in obj) {
            let alert = {};
            alert[key] = obj[key];
            alert["keyName"] = key;
            alert["messageType"] = messageType;
            alertsList.push(alert);
        }
    }
    return alertsList;
}

export function buildMessage(obj) {
    let messageBuilder = "";
    if (obj === null) {
        messageBuilder = "Unknown error occured"
    } else {
        for (const key in obj) {
            messageBuilder += `${key}: ${obj[key]}. `;
        }
    }
    return messageBuilder;
}