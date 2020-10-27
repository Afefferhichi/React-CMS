module.exports = [
  CallServer => arguments => CallServer.get('templates/' + arguments[0] + '/enable'),
  result => result
];