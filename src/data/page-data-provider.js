import {DUMMY_ABOUT_ME_PAGE_DATA, DUMMY_CONTACT_PAGE_DATA, DUMMY_HOMEPAGE_DATA, DUMMY_SERVICES_PAGE_DATA} from "./static-data";
import urlProvider from "./url-provider";
import { clientSideApiCaller } from "../rest-api-caller/api-caller"
import { catchErrorWithConsoleLog } from "../store/utils/fetch-util"
import restCallFeedbackMaker from "../rest-api-caller/rest-call-feedback-maker.js"

export async function getPageContentData(page) {
    const url = urlProvider.getPageContentApiUrl(page);
    const feedbackTexts = restCallFeedbackMaker.makeFeedbackToGetPageData();
    try{
        return await clientSideApiCaller.sendGetRequest(url, {}, feedbackTexts);
    } catch (error) {
        catchErrorWithConsoleLog(feedbackTexts, url);
    }
}

export function getPageContentDataDummy(page){
    if(page === "home"){
        return DUMMY_HOMEPAGE_DATA;
    }
    if(page === "contact"){
        return DUMMY_CONTACT_PAGE_DATA;
    }
    if(page === "services"){
        return DUMMY_SERVICES_PAGE_DATA;
    }
    if(page === "about"){
        return DUMMY_ABOUT_ME_PAGE_DATA;
    }
    else{
        return {done:"done"}
    }
}