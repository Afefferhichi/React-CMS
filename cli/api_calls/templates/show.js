module.exports = [
  CallServer => arguments => CallServer.get('templates/' + arguments[0]),
  result => result
];