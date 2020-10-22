const CallServer = require("../../utils/CallServer").default;

module.exports = arguments => CallServer.get('posts/' + arguments[0] + '/dislike');