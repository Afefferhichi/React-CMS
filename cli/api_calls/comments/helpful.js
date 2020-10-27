module.exports = [
  CallServer=> arguments => CallServer.get('comments/' + arguments[0] + '/helpful'),
  result => result
];
