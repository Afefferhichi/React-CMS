const FormData = require('form-data');
const fs = require('fs');

const testData = {
  cmtValue: 'Comment ' + String(Math.random()).substr(-3, 3),
};
const testData2 = new FormData();
testData2.append('cmtValue', 'Comment ' + String(Math.random()).substr(-3, 3))
testData2.append('attachments', fs.createReadStream('./public/favicon.ico'))
testData2.append('attachments', fs.createReadStream('./public/index.html'))

module.exports = [
  CallServer => (arguments) => CallServer.post('posts/' + arguments[0] + '/comments/', testData),
  result => result
];