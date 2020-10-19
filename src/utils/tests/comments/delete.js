const CallServer = require("../../CallServer").default;

module.exports = arguments => CallServer.delete('comments/' + arguments[0]);