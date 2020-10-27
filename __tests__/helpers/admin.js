const CallServer = require("../../src/utils/CallServer").default;
const TokenManager = require("../../src/utils/TokenManager").default;
const ADMIN_USER_DATA = require('../demo_data/admin_data.json');

const adminLogin = async () => {
  const request = await CallServer.post('login', ADMIN_USER_DATA);
  const {token} = request;
  TokenManager.setToken('demo_admin_token', token);
  CallServer.setToken(token);
  return request;
}

module.exports = {
  adminLogin
};
