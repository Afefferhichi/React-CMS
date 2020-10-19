const CallServer = require("../../CallServer").default;

module.exports = (arguments) => CallServer.get('posts/' + arguments[0] + '/comments');