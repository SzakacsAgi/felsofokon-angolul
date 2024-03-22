import { createContext, useReducer } from "react";
import {contactFormReducer, ACTIONS} from "./form-reducer";
import {isFormSendable, validateForm} from "./utils/form-util";

export const ContactFormContext = createContext({
    invalidFields: {},
    onFormSubmit: () => {},
    onFormValidation: () => {},
    isFormSendable: () => {},
});

export default function ContactFormProvider({ children }) {
    const [contactFormState, contactFormStateDispatcher] = useReducer(contactFormReducer, { invalidFields: { emailInputError: "", nameInputError: "", messageTextareaError: "" }, contactContentState: { title: "" }, isFormSent: null });
    const contextValue = {
        invalidFields: contactFormState.invalidFields,
        onFormSubmit: onFormSubmit,
        onFormValidation: onFormValidation,
        isFormSendable: isFormSendable,
        validateForm: validateForm
    }

    async function onFormSubmit(event, inputFields) {
        event.preventDefault();
        if(isFormSendable(contactFormState)) {
            console.log(inputFields);
            console.log("SENDING...");
        }
    }

    function onFormValidation(errors, validationData) {
        contactFormStateDispatcher({
            type: ACTIONS.FORM_VALIDATE,
            payload: {
                validationData,
                errors
            }
        });
    }

    return <ContactFormContext.Provider value={contextValue}>
        {children}
    </ContactFormContext.Provider>
}