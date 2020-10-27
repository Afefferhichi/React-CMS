module.exports = [
  CallServer => () => CallServer.get('users'),
  result => result
];