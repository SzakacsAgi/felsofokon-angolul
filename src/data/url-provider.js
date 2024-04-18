class UrlProvider {
    getPageContentApiUrl(page){
        let url = null;
        switch (page){
            case "home":
            case "/":
                url = "https://dummyjson.com/comments";
                break;
            case "about":
                url = "https://dummyjson.com/comments";
                break;
            case "services":
                url = "https://dummyjson.com/comments";
                break;
            case "general-english-lesson":
            case "matura-examination":
            case "translation":
                url = "https://dummyjson.com/comments";
                break;
            case "prices":
                url = "https://dummyjson.com/comments";
                break;
            case "contact":
                url = "https://dummyjson.com/comments";
                break;
            case "blog":
                url = "https://dummyjson.com/comments";
                break;
            default:
                url = "/error";
        }
        return url;
    }

    getGeoLocationApiUrl(ip){
        const baseUrl = "https://api-bdc.net/data/ip-geolocation";
        const key = process.env.REACT_APP_GEOLOCATOR_API;
        return `${baseUrl}?ip=${ip}&key=${key}`;
    }

    getGetInTouchTemplateApiUrl(){
        return `${process.env.URL}/.netlify/functions/emails/getInTouch`;
    }

    getGetInTouchEmailSendingUrl(){
        return "./.netlify/functions/sendGetInTouchEmailAPI";
    }

    getClientIpAddressUrl(){
        return "https://api.ipify.org?format=json";
    }

    getClientTownDetectUrl(){
        return "./.netlify/functions/getGeoLocation";
    }

    getAddRecipientApiUrl(){
        return "https://api.sendgrid.com/v3/marketing/contacts";
    }

    getAddSubscriberUrl(){
        return "./.netlify/functions/addSubsciber";
    }
}

module.exports = UrlProvider;