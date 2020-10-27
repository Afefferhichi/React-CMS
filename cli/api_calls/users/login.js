import TokenManager from "../../../src/utils/TokenManager";
const dotenv = require('dotenv');

const login = CallServer => async (args) => {
  dotenv.config();
  const email = args[0] || process.env.USER_EMAIL;
  const password = args[1] || process.env.USER_PASSWORD;
  try {
    const request = await CallServer.post('login', {email, password});
    const {user, token} = request;
    TokenManager.setToken(email, token);
    return request;
  } catch (error) {
    console.log('error', error);
  }
}

module.exports = [
  login,
  result => result
];
