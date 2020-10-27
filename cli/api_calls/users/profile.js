module.exports = [
  CallServer => () => CallServer.get('profile'),
  result => result
];