const parseCommand = command => {
  try {
    const commandArray = [...command.matchAll(/([^:]+):([^:]+)/)][0];
    return {
      controllerName: commandArray[1],
      actionName: commandArray[2]
    };
  } catch {
    return {};
  }
};

const getControllerName = () => {
  const command = process.argv[2];
  if (command) {
    return parseCommand(command).controllerName;
  } else {
    return false;
  }
};

const getActionName = () => {
  const command = process.argv[2];
  if (command) {
    return parseCommand(command).actionName;
  } else {
    return false;
  }
};

const getArguments = () => {
  return process.argv.slice(3)
};


module.exports = {
  getControllerName,
  getActionName,
  getArguments
};