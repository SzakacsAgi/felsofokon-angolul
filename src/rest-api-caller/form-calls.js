import {ACTIONS, formReducer} from "../store/form-reducer";
import UrlProvider from "../data/url-provider";
import {getFormData} from "../store/utils/form-util";
import {catchErrorWithConsoleLog, throwError} from "../store/utils/fetch-util";

const urlProvider = new UrlProvider();

export function sendContactForm(inputFields, state){
    getFormData(inputFields)
    .then(formData => {
        sendEmail(formData, state);
    });
}

function sendEmail(formData, state){
    fetch(urlProvider.getGetInTouchEmailSendingUrl(), {
        method: "POST",
        body: JSON.stringify({
            ...formData,
        })
    })
    .then(response => {
        let newState = formReducer(state, {type: ACTIONS.FORM_SENDING_FINISHED});
        if (response.status === 200) {
            formReducer(newState, {type: ACTIONS.FORM_SUBMIT_SUCCESS});
        }
        else {
            throwError("The email sent was unsuccessful", response);
        }
    })
    .catch(error => {
        const newState = formReducer(state, {type: ACTIONS.FORM_SENDING_FINISHED});
        formReducer(newState, {type: ACTIONS.FORM_SUBMIT_FAILURE});
        catchErrorWithConsoleLog(error, urlProvider.getGetInTouchEmailSendingUrl());
    })
}

export function getClientIpAddress(){
   return fetch(urlProvider.getClientIpAddressUrl()).then(response => response.json());
}

export function getClientTown(ip, formInputs){
    return fetch(urlProvider.getClientTownDetectUrl(), {method: "GET", headers:ip})
        .then(response => response.json())
        .then(jsonResponse => {
            return {
                ...formInputs,
                city: `${jsonResponse.data.location.city} (${jsonResponse.data.country.isoNameFull})`
            };
        })
}