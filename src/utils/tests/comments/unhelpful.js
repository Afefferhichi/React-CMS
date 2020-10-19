const CallServer = require("../../CallServer").default;

module.exports = arguments => CallServer.get('comments/' + arguments[0] + '/unhelpful');