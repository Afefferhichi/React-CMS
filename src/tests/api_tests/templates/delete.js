const CallServer = require("../../../utils/CallServer").default;

module.exports = arguments => CallServer.delete('templates/' + arguments[0]);