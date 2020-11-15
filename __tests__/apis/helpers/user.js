const CallServer = require("../../../src/utils/CallServer").default;
const TokenManager = require("../../../src/utils/TokenManager").default;
const DEMO_USER_DATA = require('../demo_data/user_data2.json');

const userLogin = async (userData = {}) => {
  const request = await CallServer.post('login', {...DEMO_USER_DATA, ...userData});
  const {token} = request;
  // request.success !== true && (console.log('request', request));
  TokenManager.setToken('demo_user_token', token);
  CallServer.setToken(TokenManager.getToken('demo_user_token'));
  return request;
}

module.exports = {
  userLogin
};
