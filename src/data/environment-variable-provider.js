class EnviromentVariableProvider{
    getNetlifyEmailsSecret(){
        return process.env.NETLIFY_EMAILS_SECRET;
    }

    getSubscribeApiKey(){
        return process.env.SUBSCRIBE_API_KEY;
    }

    getListToSubscribe(requestBody){
        const LIST_NAME = `${requestBody.list}_NEWSLETTER_LIST_ID`
        return process.env[LIST_NAME];
    }

    getGetInTouchFromEmail(){
        return process.env.REACT_APP_GET_IN_TOUCH_FROM_EMAIL;
    }

    getGetInTouchToEmail(){
        return process.env.REACT_APP_GET_IN_TOUCH_TO_EMAIL;
    }

}

module.exports = new EnviromentVariableProvider()