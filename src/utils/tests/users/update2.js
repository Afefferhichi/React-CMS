const CallServer = require("../../CallServer").default;
const fs = require('fs');
const FormData = require('form-data');

const updateUserData2 = new FormData();
updateUserData2.append('mode', 'updateAvatar');
updateUserData2.append('attachments', fs.createReadStream('./public/logo.png'))

module.exports = arguments => CallServer.putWithFile('users/' + arguments[0], updateUserData2);