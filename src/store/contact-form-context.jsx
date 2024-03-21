import { createContext, useReducer } from "react";
import {contactFormReducer, ACTIONS} from "./form-reducer";
import {isFormSendable, validateForm} from "./utils/form-util";
import {sendContactForm} from "../rest-api-caller/form-calls";

export const ContactFormContext = createContext({
    invalidFields: {},
    onFormSubmit: () => {},
    onFormValidation: () => {},
    isFormSendable: () => {},
    isFormSent: null,
    onFormReload: () => {},
    isSending: null,
});

export default function ContactFormProvider({ children }) {
    const [contactFormState, contactFormStateDispatcher] = useReducer(contactFormReducer, { invalidFields: { emailInputError: "", nameInputError: "", messageTextareaError: "" }, contactContentState: { title: "" }, isFormSent: null });
    const contextValue = {
        invalidFields: contactFormState.invalidFields,
        onFormSubmit: onFormSubmit,
        onFormValidation: onFormValidation,
        isFormSendable: isFormSendable,
        isFormSent: contactFormState.isFormSent,
        onFormReload: onFormReload,
        isSending: contactFormState.isSending,
        validateForm: validateForm
    }

    async function onFormSubmit(event, inputFields) {
        event.preventDefault();
        if(isFormSendable(contactFormState)) {
            contactFormStateDispatcher({ type: ACTIONS.FORM_IS_UNDER_SENDING });
            sendContactForm(inputFields, contactFormStateDispatcher);
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

    function onFormReload(){
        contactFormStateDispatcher({
            type: ACTIONS.SET_INITIAL_SENT_STATE
        })
    }

    return <ContactFormContext.Provider value={contextValue}>
        {children}
    </ContactFormContext.Provider>
}