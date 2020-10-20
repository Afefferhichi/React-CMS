const CallServer = require("../../CallServer").default;


module.exports = arguments => {
  const visibleMethod = arguments[1] === 'true' ? 'visible' : 'invisible';
  return CallServer.put('posts/' + arguments[0] + '/' + visibleMethod);
}