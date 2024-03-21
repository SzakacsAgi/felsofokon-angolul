import {ACTIONS} from "../store/form-reducer";
import UrlProvider from "../data/url-provider";
import {getFormData} from "../store/utils/form-util";
import {catchErrorWithConsoleLog, throwError} from "../store/utils/fetch-util";

const urlProvider = new UrlProvider();

export function sendContactForm(inputFields, contactFormStateDispatcher){
    getFormData(inputFields)
    .then(formData => {
        sendEmail(formData, contactFormStateDispatcher);
    });
}

function sendEmail(formData, contactFormStateDispatcher){
    fetch(urlProvider.getGetInTouchEmailSendingUrl(), {
        method: "POST",
        body: JSON.stringify({
            ...formData,
        })
    })
    .then(response => {
        contactFormStateDispatcher({type: ACTIONS.FORM_SENDING_FINISHED});
        if (response.status === 200) {
            contactFormStateDispatcher({type: ACTIONS.FORM_SUBMIT_SUCCESS});
        }
        else {
            throwError("The email sent was unsuccessful", response);
        }
    })
    .catch(error => {
        contactFormStateDispatcher({type: ACTIONS.FORM_SENDING_FINISHED});
        contactFormStateDispatcher({type: ACTIONS.FORM_SUBMIT_FAILURE});
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