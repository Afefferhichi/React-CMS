module.exports = [
  CallServer => () => CallServer.get('templates/categories'),
  result => result
];
