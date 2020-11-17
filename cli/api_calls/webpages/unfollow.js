module.exports = [
  CallServer => arguments => CallServer.get('webpages/' + arguments[0] + '/unfollow'),
  result => result
];
