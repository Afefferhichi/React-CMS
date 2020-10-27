module.exports = [
  CallServer => arguments => CallServer.delete('posts/' + arguments[0]),
  result => result
];