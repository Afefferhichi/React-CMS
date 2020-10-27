const FormData = require('form-data');
const fs = require('fs');

const testData = {
  pstTitle: 'cmtValue ' + String(Math.random()).substr(-3, 3),
};
const testData2 = new FormData();
testData2.append('cmtValue', 'Comment ' + String(Math.random()).substr(-3, 3))
testData2.append('attachments', fs.createReadStream('./public/logo.png'))
testData2.append('attachments', fs.createReadStream('./public/README.md'))

module.exports = [
  CallServer => arguments => CallServer.putWithFile('comments/' + arguments[0], testData2),
  result => result
];