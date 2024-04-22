const GET_IN_TOUCH_EMAIL_DATA = require("../../src/data/emails-data")
const enviromentVariableProvider = require("../../src/data/environment-variable-provider")

class RequestBodyMaker{
    makeRequestBodyToSendGetInTouchEmail(requestBody){
        const JSONRequestBody = JSON.parse(requestBody);
        const body = {
            ...GET_IN_TOUCH_EMAIL_DATA,
            parameters: {...JSONRequestBody}
        }
        return Object.keys(body.parameters).length === 0 ? JSON.stringify({}) : JSON.stringify(body);
    }

    makeRequestBodyToAddSubscriber(requestBody){
        const JSONRequestBody = JSON.parse(requestBody);
        const body = {
            "list_ids":[enviromentVariableProvider.getListToSubscribe(JSONRequestBody)],
            "contacts": [
              {
                "email": JSONRequestBody.email,
              }
            ]
        }
        return JSON.stringify(body);
    }

}

module.exports = new RequestBodyMaker()