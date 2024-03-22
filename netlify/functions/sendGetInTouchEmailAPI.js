const UrlProvider = require('../../src/data/url-provider');
const urlProvider = new UrlProvider();
const {createResponse, isPayloadProvided, catchErrorWithResponse, throwError} = require('../../src/store/utils/fetch-util');
const GET_IN_TOUCH_EMAIL_DATA = require("../../src/data/emails-data");

exports.handler = async function(event) {
    console.info(`Payload is: ${event.body}`);
    if(!isPayloadProvided(event)){
        return createResponse(400, "Payload is required");
    }
    const apiUrl = urlProvider.getGetInTouchTemplateApiUrl();
    console.info(apiUrl);
    try{
        const requestBody = JSON.parse(event.body);
         const NETLIFY_EMAILS_SECRET = process.env.NETLIFY_EMAILS_SECRET;
         const response = await fetch(apiUrl, {
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
            console.info(`${apiUrl} response was 200, email sending was successful`);
            return createResponse(200, "Contact email sent!");
        }
        else{
            throwError("Email sending was unsuccessful", response);
        }
    }
    catch(error){
        return catchErrorWithResponse(error, apiUrl);
    }
}