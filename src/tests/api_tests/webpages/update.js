const CallServer = require("../../../utils/CallServer").default;

const testData = {
  pstTitle: 'wbpDescription ' + String(Math.random()).substr(-3, 3),
};

module.exports = arguments => CallServer.putWithFile('webpages/' + arguments[0], testData);