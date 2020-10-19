const CallServer = require("../../CallServer").default;

module.exports = arguments => CallServer.delete('posts/' + arguments[0]);