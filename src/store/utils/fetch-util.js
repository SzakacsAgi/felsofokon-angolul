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

function isPayloadProvided(event){
    const bodyObject = JSON.parse(event.body);
    return !(event.body === null || Object.keys(bodyObject).length === 0);
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

function isStatusSuccessStatusCode(statusCode){
    return statusCode >= 200 && statusCode < 300;
}

module.exports = {
    createResponse,
    isPayloadProvided,
    throwError,
    catchErrorWithConsoleLog,
    catchErrorWithResponse,
    isStatusSuccessStatusCode
}