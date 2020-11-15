module.exports = [
  CallServer => (arguments) => CallServer.get('posts/search?q=' + arguments[0]),
  result => (result)
];
