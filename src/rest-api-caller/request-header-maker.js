const enviromentVariableProvider = require("../data/environment-variable-provider");

class RequestHeaderMaker{
    makeRequestHeaderToSendGetInTouchEmail(){
        return {
            "netlify-emails-secret": enviromentVariableProvider.getNetlifyEmailsSecret()
        }
    }

    makeRequestHeaderToAddSubscriber(){
        return {
            "netlify-emails-secret": enviromentVariableProvider.getNetlifyEmailsSecret(),
            "Authorization": `Bearer ${enviromentVariableProvider.getSubscribeApiKey()}`,
            "Content-Type":"application/json"
        }
    }
}

module.exports = new RequestHeaderMaker()