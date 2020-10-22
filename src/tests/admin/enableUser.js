const CallServer = require("../../utils/CallServer").default;

module.exports = arguments => CallServer.put('admin/setUserEnabled/' + arguments[0] + '/enable');