const fs = require('fs');
const FormData = require('form-data');

const testData = {
  pstTitle: 'This is Title ' + String(Math.random()).substr(-3, 3),
  pstContent: 'This is Content ' + String(Math.random()).substr(-10, 10),
};

const testData2 = new FormData();
testData2.append('pstTitle', 'This is Title ' + String(Math.random()).substr(-3, 3))
testData2.append('pstContent', 'This is Content ' + String(Math.random()).substr(-10, 10))
testData2.append('attachments', fs.createReadStream('./public/favicon.ico'))
testData2.append('attachments', fs.createReadStream('./public/index.html'))
// module.exports = () => CallServer.postWithFile('posts', testData2);

module.exports = [
  CallServer => (arguments) => CallServer.postWithFile('webpages/' + arguments[0] + '/posts', testData2),
  result => result
];
