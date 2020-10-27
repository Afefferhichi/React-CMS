module.exports = [
  CallServer => arguments => CallServer.get('templates/' + arguments[0] + '/' + arguments[1] +'/make-in-use'),
  result => result
];