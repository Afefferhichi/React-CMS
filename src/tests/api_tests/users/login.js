const CallServer = require("../../../utils/CallServer").default;

const testData2 = {
  email: 'jinnahrae@gmail.com',
  password: 'fofjrj123',
};
module.exports = () => CallServer.post('login', testData2);
