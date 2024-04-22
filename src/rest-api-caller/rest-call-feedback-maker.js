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
}

module.exports = new RestCallFeedbackMaker()