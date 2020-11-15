import {Selector} from 'testcafe';

const credentials = require('../config/credentials.json');

fixture`Login`
  .page`https://localhost:3000/`

fixture.afterEach(t => {
  // t.navigateTo('https://localhost:3000/logout')
})

let testCount = 0;
test(`${++testCount}. Should login with valid credentials`, async t => {
  const {user: {email, password}} = credentials;
  await t
    .click('#startButton')
    .typeText('input[name=email]', email)
    .typeText('input[name=password]', password)
    .click('#loginButton')
    .expect(Selector('#snackBar').innerText).contains('Successfully logged in');
});

test(`${++testCount}. Should fail to login with invalid credentials`, async t => {
  const {user: {email, invalid_password}} = credentials;
  await t
    .click('#startButton')
    .typeText('input[name=email]', email)
    .typeText('input[name=password]', invalid_password)
    .click('#loginButton')
    .expect(Selector('#snackBar').getAttribute('severity')).eql('error');
})
