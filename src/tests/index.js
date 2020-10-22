const {runTest} = require('./libs/test_utils');
const {showHelp} = require('./libs/help');

const {
  getControllerName,
  getActionName,
  getArguments
} = require('./libs/command_utils');

const controllerName = getControllerName();
const actionName = getActionName();
const arguments = getArguments();

if (!controllerName || !actionName) {
  showHelp();
} else {
  runTest(controllerName, actionName, arguments)
}

