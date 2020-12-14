module.exports = [
  CallServer => arguments => CallServer.delete('contact_messages/' + arguments[0]),
  result => result
];
