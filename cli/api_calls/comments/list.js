module.exports = [
  CallServer => (arguments) => CallServer.get('posts/' + arguments[0] + '/comments'),
  result => result
];