const CallServer = require("../../utils/CallServer").default;

module.exports = arguments => CallServer.delete('users/' + arguments[0]);