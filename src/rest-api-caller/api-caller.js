const { createResponse, isPayloadProvided, handleResponse } = require("../store/utils/fetch-util");

class ApiCaller{
    async sendGetRequest(url, requestHeader, feedbackTexts){}
    async sendPostRequest(url, requestHeader, requestBody, feedbackTexts){}
    async sendPutRequest(url, requestHeader, requestBody, feedbackTexts){}
}

class ClientSideApiCaller extends ApiCaller{
    constructor(){
        super();
        this.side = "CLIENT";
    }

    async sendGetRequest(url, requestHeader, feedbackTexts){
        const response = await fetch(url, {
            headers: requestHeader,
            method: "GET",
        });
        
       return handleResponse(url, response, feedbackTexts, {}, this.side);
    }

    async sendPostRequest(url, requestHeader, requestBody, feedbackTexts){
        if(!isPayloadProvided(requestBody)){
            return createResponse(400, "Payload is required");
        }

        const response = await fetch(url, {
            headers: requestHeader,
            method: "POST",
            body: requestBody
        });

       return handleResponse(url, response, feedbackTexts, {}, this.side);
    }
}

class ServerSideApiCaller extends ApiCaller{
    constructor(){
        super();
        this.side = "SERVER";
    }

    async sendGetRequest(url, requestHeader, feedbackTexts){
        console.info("Fetching URL: ", url);
        console.info("Request header: ", requestHeader);
        const response = await fetch(url, {
            headers: requestHeader,
            method: "GET",
        });
        const data = await response.json();
        
       return handleResponse(url, response, feedbackTexts, {data}, this.side);
    }

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

       return handleResponse(url, response, feedbackTexts, {}, this.side);
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

       return handleResponse(url, response, feedbackTexts, {}, this.side);
    }
}

module.exports = {
    clientSideApiCaller: new ClientSideApiCaller(),
    serverSideApiCaller: new ServerSideApiCaller()
}