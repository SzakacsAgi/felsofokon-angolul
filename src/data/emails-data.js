const GET_IN_TOUCH_EMAIL_DATA = {
    from: {
        email: process.env.REACT_APP_GET_IN_TOUCH_FROM_EMAIL,
        name: "Kapcsolatfelvételi kérelem"
    },
    to: process.env.REACT_APP_GET_IN_TOUCH_TO_EMAIL,
    subject: "Új ember szeretné felvenni a kapcsolatot veled",
    text: "Szép napot Anna! Valaki szeretné felvenni veled a kapcsolatot",
}

module.exports = GET_IN_TOUCH_EMAIL_DATA;