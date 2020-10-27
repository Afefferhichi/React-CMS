module.exports = [
  APICall => args => APICall.get('/allUsers', args),
  result => result
];
