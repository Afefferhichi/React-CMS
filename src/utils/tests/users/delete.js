const CallServer = require("../../CallServer").default;

module.exports = arguments => CallServer.delete('users/' + arguments[0]);