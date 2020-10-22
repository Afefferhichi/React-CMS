const CallServer = require("../../../utils/CallServer").default;

module.exports = arguments => CallServer.get('webpages/' + arguments[0]);