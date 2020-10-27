module.exports = [
  APICall => (args) => APICall.get('/attachments/' + args[0]),
  result => result
];
