const CallServer = require("../../CallServer").default;

module.exports = (arguments) => CallServer.get('attachments/' + arguments[0]);