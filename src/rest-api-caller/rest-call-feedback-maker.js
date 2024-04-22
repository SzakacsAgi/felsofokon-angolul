class RestCallFeedbackMaker{
    createFeedbackObjectTexts(successfullText, unsuccessfullText){
        return {
            successfullText,
            unsuccessfullText
        }
    }
    
    makeFeedbackToSendGetInTouchEmail(){
        return this.createFeedbackObjectTexts("Contact email sent", "Contact email send was unsuccessfull");
    }

    makeFeedbackToAddSubscriber(){
        return this.createFeedbackObjectTexts("Newsletter sign up was successful", "Newsletter sign up was unsuccessful");
    }

    makeFeedbackToGetPageData(){
        return this.createFeedbackObjectTexts("Getting page data was successful", "Getting page data was unsuccessful");
    }

    makeFeedbackToGetGeoLocation(){
        return this.createFeedbackObjectTexts("Getting geolocation was successful", "Location detect was unsuccessful");
    }

    makeFeedbackTogetClientIpAddress(){
        return this.createFeedbackObjectTexts("IP detect was successful", "IP detect was unsuccessful");
    }
}

module.exports = new RestCallFeedbackMaker()