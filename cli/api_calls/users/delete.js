module.exports = [
  CallServer => arguments => CallServer.delete('users/' + arguments[0]),
  result => result
];