const CallServer = require("../../utils/CallServer").default;

module.exports = (arguments) => CallServer.get('attachments/' + arguments[0]);