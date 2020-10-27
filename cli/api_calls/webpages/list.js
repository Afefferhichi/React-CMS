module.exports = [
  CallServer => () => CallServer.get('webpages'),
  result => result
];