import {Selector} from 'testcafe';

const credentials = require('../config/credentials.json');

fixture`Login`
  .page`/`

let testCount = 0;
test(`${++testCount}. Should login with valid credentials`, async t => {
  const {user: {email, password}} = credentials;
  const translatedText = await Selector('[data-language-to-translate-into]').innerText;
  console.log('translatedText', translatedText);
  await t.expect(translatedText).ok("ok");
});
