import {validateForm} from "./utils/form-util";

export const ACTIONS = {
    FORM_SUBMIT_SUCCESS: "FORM_SUBMIT_SUCCESS",
    FORM_SUBMIT_FAILURE: "FORM_SUBMIT_FAILURE",
    SET_INITIAL_SENT_STATE: "SET_INITIAL_SENT_STATE",
    FORM_VALIDATE: "FORM_VALIDATE",
    FORM_IS_UNDER_SENDING: "FORM_IS_UNDER_SENDING",
    FORM_SENDING_FINISHED: "FORM_SENDING_FINISHED"
}

export function contactFormReducer(state, action) {
    switch (action.type) {
        case ACTIONS.FORM_VALIDATE:
            const errors = validateForm(action.payload.validationData) ;
            return { ...state, invalidFields: { ...state.invalidFields, ...errors }};
        case ACTIONS.FORM_SUBMIT_SUCCESS:
            return { ...state, isFormSent: true };
        case ACTIONS.FORM_SUBMIT_FAILURE:
            return { ...state, isFormSent: false };
        case ACTIONS.SET_INITIAL_SENT_STATE:
            return { ...state, isFormSent: null };
        case ACTIONS.FORM_IS_UNDER_SENDING:
            return {...state, isSending:true}
        case ACTIONS.FORM_SENDING_FINISHED:
            return {...state, isSending:false}
        default:
            return state;
    }
}