const testData = {
  description: 'description ' + String(Math.random()).substr(-3, 3),
};

module.exports = [
  CallServer => arguments => CallServer.putWithFile('webpages/' + arguments[0], testData),
  result => result
];
