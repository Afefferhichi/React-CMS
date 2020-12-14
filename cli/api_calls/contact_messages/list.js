module.exports = [
  CallServer => () => CallServer.get('contact_messages'),
  result => result
];
