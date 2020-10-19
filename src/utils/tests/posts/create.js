const CallServer = require("../../CallServer").default;
const fs = require('fs');
const FormData = require('form-data');

const testData = {
  pstTitle: 'Title ' + String(Math.random()).substr(-3, 3),
  pstContent: 'Content ' + String(Math.random()).substr(-10, 10),
  uploaded_file: fs.createReadStream('./public/favicon.ico')
};

const testData2 = new FormData();
testData2.append('pstTitle', 'Title ' + String(Math.random()).substr(-3, 3))
testData2.append('pstContent', 'Content ' + String(Math.random()).substr(-10, 10))
// testData2.append('attachments', fs.createReadStream('./public/favicon.ico'))
// testData2.append('attachments', fs.createReadStream('./public/index.html'))

module.exports = () => CallServer.postWithFile('posts', testData2);
