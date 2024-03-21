import {getClientIpAddress, getClientTown} from "../../rest-api-caller/form-calls";

export function isFormSendable(contactFormState) {
    return Object.values(contactFormState.invalidFields).filter(field => field === false).length === 3;
}

export function getFormData({messageInput, nameInput, emailInput, levelSelect, causeSelect, currentLanguage}) {
    let messageInputValue = messageInput.current.value.trim();
    let nameInputValue = nameInput.current.value.trim();
    let emailInputValue = emailInput.current.value.trim();
    let levelSelectValue = levelSelect.current.innerHTML;
    let causeSelectValue = causeSelect.current.innerHTML;
    let formInputs =  {
        name: nameInputValue,
        message: messageInputValue,
        email: emailInputValue,
        level: levelSelectValue,
        cause: causeSelectValue,
        pageLanguage: currentLanguage,
        city: "Nem sikerült érzékelni"
    };

    return getClientIpAddress()
        .then(jsonIp =>
        {
            return getClientTown(jsonIp, formInputs)
        })
        .catch(error => {
            console.error('Town detect was unsuccessful', error);
            return formInputs;
        });
}

export function validateForm({validationType, inputField}) {
    let errors = {}
    let inputValue = inputField.current.value.trim();

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
                let regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                let emailFormatIsValid = inputValue.match(regex);
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