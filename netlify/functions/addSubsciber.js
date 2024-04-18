const UrlProvider = require('../../src/data/url-provider');
const urlProvider = new UrlProvider();
const {createResponse, isPayloadProvided, catchErrorWithResponse, throwError, isStatusSuccessStatusCode} = require('../../src/store/utils/fetch-util');

exports.handler = async function(event) {
    console.info(`Payload is: ${event.body}`);
    if(!isPayloadProvided(event)){
        return createResponse(400, "Payload is required");
    }
    const apiUrl = urlProvider.getAddRecipientApiUrl();
    console.info(apiUrl);
    try{
        const requestBody = JSON.parse(event.body);
        const NETLIFY_EMAILS_SECRET = process.env.NETLIFY_EMAILS_SECRET;
        const SUBSCRIBE_API_KEY = process.env.SUBSCRIBE_API_KEY;
        const LIST_NAME = `${requestBody.list}_NEWSLETTER_LIST_ID`
        const LIST_TO_SUBSCRIBE = process.env[LIST_NAME];
        const headers = {
            "netlify-emails-secret": NETLIFY_EMAILS_SECRET,
            "Authorization": `Bearer ${SUBSCRIBE_API_KEY}`,
            "Content-Type":"application/json"
        }
        const data = {
            "list_ids":[LIST_TO_SUBSCRIBE],
            "contacts": [
              {
                "email": requestBody.email,
              }
            ]
        };
        console.log("Authorization header: ",headers.Authorization);
        console.log("List name: ",LIST_NAME);
        console.log("List ID: ",LIST_TO_SUBSCRIBE);

         const response = await fetch(apiUrl, {
             headers: headers,
             method: "PUT",
             body: JSON.stringify(data)
            });

        if(isStatusSuccessStatusCode(response.status)){
            return createResponse(response.status, "Newsletter sign up was successful");
        }
        else{
            throwError("Newsletter sign up was unsuccessful", response);
        }
    }
    catch(error){
        return catchErrorWithResponse(error, apiUrl);
    }
}