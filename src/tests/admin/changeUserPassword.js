const CallServer = require("../../utils/CallServer").default;

const updateUserData2 = {
  mode: 'updatePasswordByAdmin',
  newPassword: 'dkflfkd123',
};

module.exports = arguments => CallServer.put('admin/changeUserPassword/' + arguments[0], updateUserData2);