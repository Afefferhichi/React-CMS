import TokenManager from "../../../src/utils/TokenManager";

const dotenv = require('dotenv');

const login = CallServer => async (args) => {
  dotenv.config();
  let email, password;
  if (!args[0] || args[0] === '0' || args[0] === '1') {
    if (!args[0]) {
      email = process.env.USER_EMAIL;
      password = process.env.USER_PASSWORD;
    } else {
      email = args[0] === '0'
        ? process.env.USER_EMAIL
        : args[0] === '1'
          ? process.env.USER2_EMAIL
          : '';
      password = args[0] === '0'
        ? process.env.USER_PASSWORD
        : args[0] === '1'
          ? process.env.USER2_PASSWORD
          : '';
    }
  } else {
    email = args[0] || process.env.USER_EMAIL;
    password = args[1] || process.env.USER_PASSWORD;
  }
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
