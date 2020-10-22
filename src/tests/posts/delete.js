const CallServer = require("../../utils/CallServer").default;

module.exports = arguments => CallServer.delete('posts/' + arguments[0]);