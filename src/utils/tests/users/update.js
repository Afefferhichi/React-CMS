const CallServer = require("../../CallServer").default;

const updateUserData = {
  mode: 'updateEmail',
  currentEmail: 'admin2@local.com',
  newEmail: 'admin@local.com',
};

const updateUserData2 = {
  mode: 'updatePassword',
  currentPassword: 'admin1234',
  newPassword: 'admin123',
};

module.exports = arguments => CallServer.put('users/' + arguments[0], updateUserData2);