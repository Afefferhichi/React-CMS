module.exports = [
  CallServer => arguments => CallServer.get('contact_messages/' + arguments[0]),
  result => result
];
