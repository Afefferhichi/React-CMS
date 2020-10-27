module.exports = [
  CallServer => arguments => CallServer.get('templates/' + arguments[0] + '/disable'),
  result => result
];