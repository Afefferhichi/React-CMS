import {Selector} from 'testcafe';

const credentials = require('../config/credentials.json');

fixture`Login`
  .page`https://translate.google.com/?sl=ko&tl=zh-CN&text=%EC%9D%B4%20%EC%9A%94%EB%A6%AC%EB%8A%94%20%20%EB%84%88%EB%AC%B4%20%EC%A7%9C%EC%9A%94.&op=translate/`

let testCount = 0;
test(`${++testCount}. Should login with valid credentials`, async t => {
  const {user: {email, password}} = credentials;
  const translatedText = await Selector('[data-language-to-translate-into]').innerText;
  console.log('translatedText', translatedText);
  await t.expect(translatedText).ok("ok");
});
