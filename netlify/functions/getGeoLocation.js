const UrlProvider = require('../../src/data/url-provider');
const urlProvider = new UrlProvider();
const {createResponse, throwError, catchErrorWithResponse} = require('../../src/store/utils/fetch-util');

exports.handler = async function(event) {
    try {
        const response = await fetch(urlProvider.getGeoLocationApiUrl(event.headers.ip), {method: "GET"});
        if(response.status !== 200){
            throwError("Location detect was unsuccessful", response);
        }
        const json = await response.json();
        return createResponse(200, response.statusText, {data: json});
    }
    catch(error){
       return catchErrorWithResponse(error, urlProvider.getGeoLocationApiUrl(event.headers.ip));
    }
}