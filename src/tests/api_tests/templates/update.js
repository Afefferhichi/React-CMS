const CallServer = require("../../../utils/CallServer").default;

const testData = {
  name: 'Name updated ' + String(Math.random()).substr(-3, 3),
  category: 'Category updated ' + String(Math.random()).substr(-10, 10),
  description: 'Description updated ' + String(Math.random()).substr(-10, 10),
  html: 'Category updated ' + String(Math.random()).substr(-10, 10),
  design: 'Category updated ' + String(Math.random()).substr(-10, 10),
};

module.exports = arguments => CallServer.put('templates/' + arguments[0], testData);