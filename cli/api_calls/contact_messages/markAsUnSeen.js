module.exports = [
  CallServer => arguments => CallServer.put('contact_messages/' + arguments[0] + '/markAsUnSeen'),
  result => result
];
