module.exports = [
  CallServer => () => CallServer.get('contact_messages/unseen'),
  result => result
];
