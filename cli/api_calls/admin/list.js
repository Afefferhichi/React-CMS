module.exports = [
  APICall => () => APICall.get('/allUsers'),
  result => result
];
