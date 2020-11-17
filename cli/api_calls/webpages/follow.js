module.exports = [
  CallServer => arguments => CallServer.get('webpages/' + arguments[0] + '/follow'),
  result => result
];
