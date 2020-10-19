const runTest = (controllerName, actionName, arguments) => {
  console.log(controllerName, actionName, arguments);
  const testFunc = require('../' + controllerName + '/' + actionName);
  if (actionName === 'list') {
    testFunc(arguments).then(result => console.log(result));
  } else {
    testFunc(arguments).then((result) => {
      console.log('result', result);
      const testFunc2 = require('../' + controllerName + '/list');
      // testFunc2(arguments).then(result => console.log(result));
    });
  }
};


module.exports = {
  runTest
};