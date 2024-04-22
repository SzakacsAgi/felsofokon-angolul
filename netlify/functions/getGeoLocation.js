const urlProvider = require('../../src/data/url-provider');
const { catchErrorWithResponse } = require('../../src/store/utils/fetch-util');
const { serverSideApiCaller } = require("../../src/rest-api-caller/api-caller");
const restCallFeedbackMaker = require("../../src/rest-api-caller/rest-call-feedback-maker");

class GeoLocationGetter{
    constructor(){
        this.feedbackTexts = restCallFeedbackMaker.makeFeedbackToGetGeoLocation();
    }
    async get(event){
        this.apiUrl = urlProvider.getGeoLocationApiUrl(event.headers.ip);
        return await serverSideApiCaller.sendGetRequest(this.apiUrl, {}, this.feedbackTexts);
    }
}

const geoLocationGetter = new GeoLocationGetter();
exports.handler = async function(event) {
    try{
        return await geoLocationGetter.get(event);
    }
    catch(error){
        const apiUrl = geoLocationGetter.apiUrl;
        return catchErrorWithResponse(error, apiUrl);
    }
}