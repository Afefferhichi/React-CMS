module.exports = [
  CallServer => () => CallServer.get('templates'),
  result => result
];