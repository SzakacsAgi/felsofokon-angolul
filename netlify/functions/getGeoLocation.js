const UrlProvider = require('../../src/data/url-provider');
const urlProvider = new UrlProvider();
const {createResponse, throwError, catchErrorWithResponse} = require('../../src/store/utils/fetch-util');

exports.handler = async function(event) {
    const apiUrl = urlProvider.getGeoLocationApiUrl(event.headers.ip);
    try {
        const response = await fetch(apiUrl, {method: "GET"});
        if(response.status !== 200){
            throwError("Location detect was unsuccessful", response);
        }
        const data = await response.json();
        return createResponse(200, response.statusText, {data: data});
    }
    catch(error){
       return catchErrorWithResponse(error, apiUrl);
    }
}