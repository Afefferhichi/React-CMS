const testData = {
  title: 'This is Title ' + String(Math.random()).substr(-3, 3),
  email: String(Math.random()).substr(-3, 3)+'@abc.com',
  content: 'This is Content ' + String(Math.random()).substr(-10, 10),
};

module.exports = [
  CallServer => (arguments) => CallServer.post('contact_messages', testData),
  result => result
];
