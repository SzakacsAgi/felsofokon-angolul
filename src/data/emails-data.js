const enviromentVariableProvider = require("./environment-variable-provider");

 const GET_IN_TOUCH_EMAIL_DATA = {
    from: {
        email: enviromentVariableProvider.getGetInTouchFromEmail(),
        name: "Kapcsolatfelvételi kérelem"
    },
    to: enviromentVariableProvider.getGetInTouchToEmail(),
    subject: "Új ember szeretné felvenni a kapcsolatot veled",
    text: "Szép napot Anna! Valaki szeretné felvenni veled a kapcsolatot",
}

module.exports = GET_IN_TOUCH_EMAIL_DATA