import TokenManager from "../../../src/utils/TokenManager";

const dotenv = require('dotenv');
dotenv.config();
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

module.exports = [
  APICall => async () => {
    return await APICall.post('login', {email, password});
  },
  request => {
    try {
      const {user, token} = request;
      TokenManager.setToken(email, token);
      return request;
    } catch (error) {
      console.log('error', error);
    }
  }
];