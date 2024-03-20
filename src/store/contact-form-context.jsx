import { createContext, useReducer } from "react";

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
        isSending: contactFormState.isSending
    }

    function contactFormReducer(state, action) {
        switch (action.type) {
            case 'FORM_SUBMIT_SUCCESS':
                return { ...state, isFormSent: true };
            case 'FORM_SUBMIT_FAILURE':
                return { ...state, isFormSent: false };
            case 'SET_INITIAL_SENT_STATE':
                return { ...state, isFormSent: null };
            case 'FORM_VALIDATE':
                const errors = validateForm(action.payload.validationData) ;
                return { ...state, invalidFields: { ...state.invalidFields, ...errors }};
            case 'FORM_IS_UNDER_SENDING':
                return {...state, isSending:true}
            case 'FORM_SENDING_FINISHED':
                return {...state, isSending:false}
            default:
                return state;
        }
    }

    function isFormSendable(contactFormState) {
        return Object.values(contactFormState.invalidFields).filter(field => field === false).length === 3;
    }

    function onFormSubmit(event, inputFields) {
        event.preventDefault();
        if (isFormSendable(contactFormState)) {
            contactFormStateDispatcher({ type: 'FORM_IS_UNDER_SENDING' });
            getFormData(inputFields).then(formData =>{
                fetch(`./.netlify/functions/getInTouch`, {
                    method: "POST",
                    body: JSON.stringify({
                        ...formData,
                    })
                })
                .then(response => {
                    contactFormStateDispatcher({ type: 'FORM_SENDING_FINISHED'});
                    if (response.status === 200){
                        contactFormStateDispatcher({ type: 'FORM_SUBMIT_SUCCESS' });
                    }
                    else{
                        let error= new Error("The email sent was unsuccessful");
                        error.cause = {statusCode:response.status, statusText:response.statusText}
                        throw error;
                    }
                })
                .catch(error => {
                    console.error(`Form sending was unsuccessful ${error}`);
                    contactFormStateDispatcher({ type:  'FORM_SENDING_FINISHED'});
                    contactFormStateDispatcher({ type: 'FORM_SUBMIT_FAILURE' });
                })
            });
        }
    }

    function onFormValidation(errors, validationData) {
        contactFormStateDispatcher({
            type: 'FORM_VALIDATE',
            payload: {
                validationData,
                errors
            }
        });
    }

    function getFormData({messageInput, nameInput, emailInput, levelSelect, causeSelect, currentLanguage}) {
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

        return fetch(`./.netlify/functions/getGeoLocation`, {method: "GET",})
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse)
                return {
                    ...formInputs,
                    city: `${jsonResponse.data.location.city} (${jsonResponse.data.country.isoNameFull})`
                };
            })
            .catch(error => {
                console.error('Town detect was unsuccessful', error);
                return formInputs;
            });
    }

    function onFormReload(){
        contactFormStateDispatcher({
            type: 'SET_INITIAL_SENT_STATE'
        })
    }

    function validateForm({validationType, inputField}) {
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
                if (!inputValue) {
                    errors.emailInputError = true;
                } else {
                    let regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                    let emailFormatIsValid = inputValue.match(regex);
                    if (!emailFormatIsValid) {
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

    return <ContactFormContext.Provider value={contextValue}>
        {children}
    </ContactFormContext.Provider>
}
