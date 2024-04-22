const urlProvider = require('../../src/data/url-provider');
const { catchErrorWithResponse } = require('../../src/store/utils/fetch-util');
const { serverSideApiCaller } = require("../../src/rest-api-caller/api-caller");
const requestBodyMaker = require("../../src/rest-api-caller/request-body-maker");
const requestHeaderMaker = require("../../src/rest-api-caller/request-header-maker");
const restCallFeedbackMaker = require("../../src/rest-api-caller/rest-call-feedback-maker")

class GetInTouchEmilSendler{
    constructor(){
        this.apiUrl = urlProvider.getGetInTouchTemplateApiUrl();
        this.requestHeader = requestHeaderMaker.makeRequestHeaderToSendGetInTouchEmail();
        this.feedbackTexts = restCallFeedbackMaker.makeFeedbackToSendGetInTouchEmail();
    }
    async send(event){
        const requestBody = requestBodyMaker.makeRequestBodyToSendGetInTouchEmail(event.body);
        return await serverSideApiCaller.sendPostRequest(this.apiUrl, this.requestHeader, requestBody, this.feedbackTexts);
    }
}

const getInTouchEmilSendler = new GetInTouchEmilSendler();
exports.handler = async function(event) {
    try{
        return await getInTouchEmilSendler.send(event);
    }
    catch(error){
        const apiUrl = getInTouchEmilSendler.apiUrl;
        return catchErrorWithResponse(error, apiUrl);
    }
}