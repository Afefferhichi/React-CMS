const runApiTest = (controllerName, actionName, arguments) => {
  console.log(controllerName, actionName, arguments);
  const testFunc = require('../api_tests/' + controllerName + '/' + actionName);
  if (actionName === 'list') {
    testFunc(arguments).then(result => console.log((result)));
  } else {
    testFunc(arguments).then((result) => {
      console.log('result', (result));
      const testFunc2 = require('../api_tests/' + controllerName + '/list');
      // testFunc2(arguments).then(result => console.log(result));
    });
  }
};


module.exports = {
  runApiTest
};