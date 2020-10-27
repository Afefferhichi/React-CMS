module.exports = [
  CallServer => arguments => CallServer.delete('webpages/' + arguments[0]),
  result => result
];