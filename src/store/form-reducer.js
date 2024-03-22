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
        default:
            return state;
    }
}