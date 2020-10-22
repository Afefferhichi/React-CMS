const CallServer = require("../../utils/CallServer").default;
const fs = require('fs');
const FormData = require('form-data');

const testData = {
  wbpDescription: 'wbpDescription ' + String(Math.random()).substr(-3, 3),
};
module.exports = () => CallServer.post('webpages', testData);
