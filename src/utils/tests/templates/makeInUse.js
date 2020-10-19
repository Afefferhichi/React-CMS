const CallServer = require("../../CallServer").default;

module.exports = arguments => CallServer.get('templates/' + arguments[0] + '/' + arguments[1] +'/make-in-use');