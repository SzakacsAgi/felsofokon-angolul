import {getClientIpAddress, getClientTown} from "../../rest-api-caller/form-calls";
import { cloneElement } from "react";

export function isFormSendable(contactFormState) {
    const inputNotRequiringValidation = ["SELECT"];
    const validFields = Object.values(contactFormState.invalidFields).filter(field => field === false);
    const inputFields = Object.values(contactFormState.inputs).filter(input => !inputNotRequiringValidation.includes(input.props.type));
    return validFields.length === inputFields.length;
}

export function validateForm({validationType, inputField, id}) {
    let errors = {}
    let inputValue = inputField.current.value.trim();
    const EMAIL_FORMAT_REGEX = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

    switch (validationType) {
        case "isNotNull":
            errors[id] = !inputValue;
            break;
        case "isValidEmail":
            if(!inputValue) {
                errors[id] = true;
            } else {
                let emailFormatIsValid = inputValue.match(EMAIL_FORMAT_REGEX);
                if(!emailFormatIsValid) {
                    errors[id] = true;
                } else {
                    errors[id] = false;
                }
            }
            break;
        default:
            console.log("Input type was not provided");
    }
    return errors;
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
        .then(jsonIp => {
            return getClientTown(jsonIp, formInputs)
        })
        .catch(error => {
            console.info('Town detect was unsuccessful', error);
            return formInputs;
        });
}

export function getModifiedSumbitButton(submitButton, formState){
    const isButtonDisabled = !isFormSendable(formState);
    const modifiedSubmitButton = cloneElement(submitButton, {
        ...submitButton.props,
        disabled: isButtonDisabled,
        title: isButtonDisabled ? submitButton.props.disabledText : submitButton.props.title
    })
    return modifiedSubmitButton;
}

export function getModifiedFormInputs(inputs, formState, setFormState){
    const modifiedInputs = {}
    Object.keys(inputs).forEach(key => {
      const InputComponent = inputs[key].type
      const inputProps = {
        ...inputs[key].props,
        formState: { ...formState, updateFormState: setFormState },
        ref: inputs[key].ref
      }
      inputs[key] = <InputComponent key={key} {...inputProps} />
      modifiedInputs[key] = <InputComponent key={key} {...inputProps} />
    })
    return modifiedInputs;
}