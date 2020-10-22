const CallServer = require("../../../utils/CallServer").default;

module.exports = arguments => CallServer.get('templates/' + arguments[0] + '/disable');