export function isFormSendable(contactFormState) {
    return Object.values(contactFormState.invalidFields).filter(field => field === false).length === 3;
}

export function validateForm({validationType, inputField}) {
    let errors = {}
    let inputValue = inputField.current.value.trim();
    const EMAIL_FORMAT_REGEX = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

    switch (validationType) {
        case "message":
            errors.messageTextareaError = !inputValue;
            break;
        case "name":
            errors.nameInputError = !inputValue;
            break;
        case "email":
            if(!inputValue) {
                errors.emailInputError = true;
            } else {
                let emailFormatIsValid = inputValue.match(EMAIL_FORMAT_REGEX);
                if(!emailFormatIsValid) {
                    errors.emailInputError = true;
                } else {
                    errors.emailInputError = false;
                }
            }
            break;
        default:
            console.log("Input type was not provided");
    }
    return errors;
}