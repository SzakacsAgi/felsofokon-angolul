function createResponse(statusCode, message, data = {}) {
    return {
        statusCode: statusCode,
        body: JSON.stringify({
            message,
            statusCode,
            ...data
        })
    }
}

function isPayloadProvided(requestBody){
    const bodyObject = JSON.parse(requestBody);
    return !(Object.keys(bodyObject).length === 0);
}

function throwError(errorText, response){
    let error = new Error(errorText);
    error.cause = {statusCode: response.status, statusText: response.statusText}
    throw error;
}

function catchErrorWithConsoleLog(error, server){
    if (error.cause) {
        console.error(`${error.cause.status} : ${error.cause.statusText}`);
    }
    else {
        console.error(`HTTP 500 : ${server} is unavailable`);
    }
}

function catchErrorWithResponse(error, server){
    if(error.cause){
        console.error(`Error: ${error.cause.statusCode} - ${error.cause.statusText}, with ${server}`);
        return createResponse(error.cause.statusCode, error.cause.statusText);
    } else{
        console.error(`Error: ${error}, with ${server}`);
        return createResponse(500, `${server} is unavailable`);
    }
}

function isSuccesful(response){
    const statusCode = response.status;
    return 200 <= statusCode && statusCode < 300;
}

function handleResponse(apiUrl, response, {successfullText, unsuccessfullText}, data={}, side){
    if(isSuccesful(response)){
        if(side === "CLIENT"){
            return response;
        }
        console.info(`${apiUrl} response was ${response.status}, ${successfullText}}`);
        return createResponse(response.status, successfullText, data);
    }
    else{
        throwError(unsuccessfullText, response);
    }
}

module.exports = {
    createResponse,
    isPayloadProvided,
    throwError,
    catchErrorWithConsoleLog,
    catchErrorWithResponse,
    isSuccesful,
    handleResponse
}