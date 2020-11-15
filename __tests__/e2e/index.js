const createTestCafe = require('testcafe');
const {getTestNameFromArguments} = require('./libs/arguments');
const test_files = require('./test_files.json');

const runTestCafe = async () => {
  const testName = getTestNameFromArguments();
  if (!testName || !test_files[testName]) {
    console.log('Test name or test files are invalid. You can use one of followings');
    console.log(Object.keys(test_files));
    return;
  }

  const testSrc = test_files[testName];

  const testcafe = await createTestCafe('localhost', 1337, 1338);
  try {
    const runner = testcafe.createRunner();
    const failed = await runner
      .browsers(['chrome:headless'])
      .src('./__tests__/e2e/' + testSrc)
      .run({
        skipJsErrors: true,
        selectorTimeout: 5000,
        assertionTimeout: 1000,
        pageLoadTimeout: 5000,
        speed: 1,
        stopOnFirstFail: true
      });

    console.log('Tests failed: ' + failed);
  } finally {
    await testcafe.close();
  }
}

runTestCafe();
