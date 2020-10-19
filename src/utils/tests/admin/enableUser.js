const CallServer = require("../../CallServer").default;

module.exports = arguments => CallServer.put('admin/setUserEnabled/' + arguments[0] + '/enable');