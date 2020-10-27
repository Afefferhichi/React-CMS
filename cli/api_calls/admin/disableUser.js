module.exports = [
  APICall => args => APICall.put('setUserEnabled/' + args[0] + '/disable'),
  result => result
];
