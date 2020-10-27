module.exports = [
  APICall => () => APICall.get('/attachments'),
  result => result
];
