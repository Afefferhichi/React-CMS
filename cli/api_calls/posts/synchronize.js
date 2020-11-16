module.exports = [
  CallServer => (arguments) => CallServer.get('posts/synchronize'),
  result => (result)
];
