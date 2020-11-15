import {t} from 'testcafe';
const credentials = require('../config/credentials.json');

export async function user_login() {
  const {user: {email, password}} = credentials;
  await t
    .click('#startButton')
    .typeText('input[name=email]', email)
    .typeText('input[name=password]', password)
    .click('#loginButton');
}
