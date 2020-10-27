module.exports = [
  CallServer => () => CallServer.get('posts'),
  result => result
];