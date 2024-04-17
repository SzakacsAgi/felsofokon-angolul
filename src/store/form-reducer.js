import {validateForm} from "./utils/form-util";
export const ACTIONS = {
    FORM_SUBMIT_SUCCESS: "FORM_SUBMIT_SUCCESS",
    FORM_SUBMIT_FAILURE: "FORM_SUBMIT_FAILURE",
    SET_INITIAL_SENT_STATE: "SET_INITIAL_SENT_STATE",
    FORM_VALIDATE: "FORM_VALIDATE",
    FORM_IS_UNDER_SENDING: "FORM_IS_UNDER_SENDING",
    FORM_SENDING_FINISHED: "FORM_SENDING_FINISHED"
}

export function formReducer(state, action) {
    switch (action.type) {
        case ACTIONS.FORM_VALIDATE:
            const errors = validateForm(action.payload.validationData);
           return  state.updateFormState({ ...state, invalidFields: { ...state.invalidFields, ...errors }});
        case ACTIONS.FORM_SUBMIT_SUCCESS:
            return state.updateFormState({ ...state, isFormSent: true });
        case ACTIONS.FORM_SUBMIT_FAILURE:
            return state.updateFormState({ ...state, isFormSent: false });
        case ACTIONS.SET_INITIAL_SENT_STATE:
            return state.updateFormState({ ...state, isFormSent: null });
        case ACTIONS.FORM_IS_UNDER_SENDING:
             state.updateFormState({ ...state, isSending:true});
             return { ...state, isSending:true}
        case ACTIONS.FORM_SENDING_FINISHED:
             state.updateFormState({ ...state, isSending:false});
             return { ...state, isSending:false}
        default:
            return state.updateFormState(state);
    }
}