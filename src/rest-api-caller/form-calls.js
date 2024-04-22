import {ACTIONS, formReducer} from "../store/form-reducer";
import UrlProvider from "../data/url-provider";
import {getFormData} from "../store/utils/form-util";
import {catchErrorWithConsoleLog, throwError, isSuccesful} from "../store/utils/fetch-util";

const urlProvider = new UrlProvider();

export function sendContactForm(inputFields, state){
    const url = urlProvider.getGetInTouchEmailSendingUrl();
    getFormData(inputFields)
    .then(formData => {
        sendEmail(formData, state, url);
    });
}

function sendEmail(formData, state, url){
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            ...formData,
        })
    })
    .then(response => {
        let newState = formReducer(state, {type: ACTIONS.FORM_SENDING_FINISHED});
        if (isSuccesful(response)) {
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

export function subscribeOnNewsletter(inputFields, state){
    const url = urlProvider.getAddSubscriberUrl();
    sendEmail(inputFields, state, url);
}