const UrlProvider = require('../../src/data/url-provider');
const urlProvider = new UrlProvider();
const {createResponse, checkIfPayloadProvided, catchErrorWithResponse, throwError} = require('../../src/store/utils/fetch-util');
const GET_IN_TOUCH_EMAIL_DATA = require("../../src/data/emails-data");

exports.handler = async function(event) {
    const payloadCheckResponse =checkIfPayloadProvided(event);
    if(payloadCheckResponse !== 200){
        return payloadCheckResponse;
    }

    try{
         const requestBody = JSON.parse(event.body);
         const NETLIFY_EMAILS_SECRET = process.env.NETLIFY_EMAILS_SECRET;
         const response = await fetch(urlProvider.getGetInTouchTemplateApiUrl(), {
             headers: {
                 "netlify-emails-secret": NETLIFY_EMAILS_SECRET
             },
             method: "POST",
             body: JSON.stringify({
                 ...GET_IN_TOUCH_EMAIL_DATA,
                 parameters: {...requestBody}
             })
         });

        if(response.status === 200){
            return createResponse(200, "Contact email sent!");
        }
        else{
            throwError("Email sending was unsuccessful", response);
        }
    }
    catch(error){
        return catchErrorWithResponse(error, urlProvider.getGetInTouchTemplateApiUrl());
    }
}