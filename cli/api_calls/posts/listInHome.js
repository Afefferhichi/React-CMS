module.exports = [
  CallServer => () => CallServer.get('posts/listInHome'),
  result => result
];
