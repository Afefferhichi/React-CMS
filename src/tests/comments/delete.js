const CallServer = require("../../utils/CallServer").default;

module.exports = arguments => CallServer.delete('comments/' + arguments[0]);