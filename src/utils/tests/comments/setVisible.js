const CallServer = require("../../CallServer").default;


module.exports = arguments => {
  return CallServer.put('admin/comments/' + arguments[0] + '/' + arguments[1]);
}