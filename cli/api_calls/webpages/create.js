const testData = {
  wbpDescription: 'wbpDescription ' + String(Math.random()).substr(-3, 3),
};
module.exports = [
  CallServer => () => CallServer.post('webpages', testData),
  result => result
];
