const CallServer = require("../../../utils/CallServer").default;

module.exports = arguments => CallServer.get('comments/' + arguments[0] + '/helpful');