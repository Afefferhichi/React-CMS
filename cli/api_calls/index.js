const {runApiTestAndReturn} = require('../libs/test_utils');
const {showHelp} = require('../libs/help');

const {
  getControllerName,
  getActionName,
  getArguments
} = require('../libs/command_utils');

const controllerName = getControllerName();
const actionName = getActionName();
const arguments = getArguments();

if (!controllerName || !actionName) {
  showHelp();
} else {
  runApiTestAndReturn(controllerName, actionName, arguments)
}

