const CallServer = require("../../CallServer").default;

module.exports = arguments => CallServer.delete('templates/' + arguments[0]);