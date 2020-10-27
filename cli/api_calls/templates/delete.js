module.exports = [
  CallServer => arguments => CallServer.delete('templates/' + arguments[0]),
  result => result
];