module.exports = [
  CallServer => arguments => CallServer.put('admin/comments/' + arguments[0] + '/' + arguments[1]),
  result => result
];