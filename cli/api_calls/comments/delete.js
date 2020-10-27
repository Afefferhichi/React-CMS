module.exports = [
  CallServer => arguments => CallServer.delete('comments/' + arguments[0]),
  result => result
];