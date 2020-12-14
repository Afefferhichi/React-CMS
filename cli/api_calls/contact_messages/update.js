const testData = {
  title: 'Title ' + String(Math.random()).substr(-3, 3),
  email: String(Math.random()).substr(-3, 3)+'@abc.com',
  content: 'Content ' + String(Math.random()).substr(-10, 10),
};

module.exports = [
  CallServer => arguments => CallServer.putWithFile('contact_messages/' + arguments[0], testData),
  result => result
];
