const { createResponse, isPayloadProvided, handleResponse } = require("../store/utils/fetch-util");

class ApiCaller{
    async sendPostRequest(url, requestHeader, requestBody, feedbackTexts){
        console.info("Fetching URL: ", url);
        console.info("Request header: ", requestHeader);
        console.info("Request body: ", requestBody);

        if(!isPayloadProvided(requestBody)){
            return createResponse(400, "Payload is required");
        }

        const response = await fetch(url, {
            headers: requestHeader,
            method: "POST",
            body: requestBody
        });

       return handleResponse(url, response, feedbackTexts);
    }

    async sendPutRequest(url, requestHeader, requestBody, feedbackTexts){
        console.info("Fetching URL: ", url);
        console.info("Request header: ", requestHeader);
        console.info("Request body: ", requestBody);

        if(!isPayloadProvided(requestBody)){
            return createResponse(400, "Payload is required");
        }

        const response = await fetch(url, {
            headers: requestHeader,
            method: "PUT",
            body: requestBody
        });

       return handleResponse(url, response, feedbackTexts);
    }
}

module.exports = new ApiCaller()
