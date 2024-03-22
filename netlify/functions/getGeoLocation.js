const UrlProvider = require('../../src/data/url-provider');
const urlProvider = new UrlProvider();
const {createResponse, throwError, catchErrorWithResponse} = require('../../src/store/utils/fetch-util');

exports.handler = async function(event) {
    console.info(`Detected client ip address is: ${event.headers.ip}`)
    const apiUrl = urlProvider.getGeoLocationApiUrl(event.headers.ip);
    try {
        const response = await fetch(apiUrl, {method: "GET"});
        if(response.status !== 200){
            throwError("Location detect was unsuccessful", response);
        }
        const data = await response.json();
        console.info(`${apiUrl} response was 200, getting geolocation was successful`);
        return createResponse(200, response.statusText, {data: data});
    }
    catch(error){
       return catchErrorWithResponse(error, apiUrl);
    }
}