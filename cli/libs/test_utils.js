import TokenManager from "../../src/utils/TokenManager";

const runApiTest = async (controllerName, actionName, args) => {
  try {
    const CallServer = require("../../src/utils/CallServer").default;
    CallServer.setToken(TokenManager.getLastLoggedInToken());
    const testFunc = require('../api_calls/' + controllerName + '/' + actionName);
    const result = await testFunc(args);
    console.log(controllerName, actionName, args, result);
  } catch (e) {
    console.log('Error on running apiTest', e);
  }
};

const runApiTestAndReturn = async (controllerName, actionName, args) => {
  try {
    const CallServer = require("../../src/utils/CallServer").default;
    CallServer.setToken(TokenManager.getLastLoggedInToken());
    const [testFunc, funcCallback] = require('../api_calls/' + controllerName + '/' + actionName);
    const result = await testFunc(CallServer)(args);
    console.log(controllerName, actionName, args, funcCallback(result));
  } catch (e) {
    console.log('Error on running apiTest', e);
  }
};

module.exports = {
  runApiTest,
  runApiTestAndReturn
};