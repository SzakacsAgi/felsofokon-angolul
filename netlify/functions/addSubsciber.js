const UrlProvider = require('../../src/data/url-provider');
const urlProvider = new UrlProvider();
const { catchErrorWithResponse } = require('../../src/store/utils/fetch-util');
const apiCaller = require("../../src/rest-api-caller/api-caller");
const requestBodyMaker = require("../../src/rest-api-caller/request-body-maker");
const requestHeaderMaker = require("../../src/rest-api-caller/request-header-maker");
const restCallFeedbackMaker = require("../../src/rest-api-caller/rest-call-feedback-maker")

class NewsletterSubscriber{
    constructor(){
        this.apiUrl = urlProvider.getAddRecipientApiUrl();
    }
    async subscribe(event){
        const requestBody = requestBodyMaker.makeRequestBodyToAddSubscriber(event.body);
        const requestHeader = requestHeaderMaker.makeRequestHeaderToAddSubscriber();
        const feedbackTexts = restCallFeedbackMaker.makeFeedbackToSendGetInTouchEmail();
        return await apiCaller.sendPutRequest(this.apiUrl, requestHeader, requestBody, feedbackTexts);
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