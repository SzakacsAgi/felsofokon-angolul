const urlProvider = require('../../src/data/url-provider');
const { catchErrorWithResponse } = require('../../src/store/utils/fetch-util');
const { serverSideApiCaller } = require("../../src/rest-api-caller/api-caller");
const requestBodyMaker = require("../../src/rest-api-caller/request-body-maker");
const requestHeaderMaker = require("../../src/rest-api-caller/request-header-maker");
const restCallFeedbackMaker = require("../../src/rest-api-caller/rest-call-feedback-maker");

class NewsletterSubscriber{
    constructor(){
        this.apiUrl = urlProvider.getAddRecipientApiUrl();
        this.requestHeader = requestHeaderMaker.makeRequestHeaderToAddSubscriber();
        this.feedbackTexts = restCallFeedbackMaker.makeFeedbackToSendGetInTouchEmail();
    }
    async subscribe(event){
        const requestBody = requestBodyMaker.makeRequestBodyToAddSubscriber(event.body);
        return await serverSideApiCaller.sendPutRequest(this.apiUrl, this.requestHeader, requestBody, this.feedbackTexts);
    }
}

const newsletterSubscriber = new NewsletterSubscriber();
exports.handler = async function(event) {
    try{
        return await newsletterSubscriber.subscribe(event);
    }
    catch(error){
        const apiUrl = newsletterSubscriber.apiUrl;
        return catchErrorWithResponse(error, apiUrl);
    }
}