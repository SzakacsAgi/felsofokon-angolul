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

function checkIfPayloadProvided(event){
    if(event.body === null || Object.keys(JSON.parse(event.body)).length === 0) {
        return createResponse(400, "Payload is required")
    }
    return 200;
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
        console.error(`500 : ${server} is unavailable`);
    }
}

function catchErrorWithResponse(error, server){
    console.error('Error occurred: ', error);
    if(error.cause){
        return createResponse(error.cause.status, error.cause.statusText);
    } else{
        return createResponse(500, `${server} is unavailable`);
    }
}

module.exports = {
    createResponse,
    checkIfPayloadProvided,
    throwError,
    catchErrorWithConsoleLog,
    catchErrorWithResponse
}