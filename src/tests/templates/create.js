const CallServer = require("../../utils/CallServer").default;

const testData = {
  name: 'Name ' + String(Math.random()).substr(-3, 3),
  category: 'Category ' + String(Math.random()).substr(-10, 10),
  description: 'Description ' + String(Math.random()).substr(-10, 10),
  html: 'Category ' + String(Math.random()).substr(-10, 10),
  design: 'Category ' + String(Math.random()).substr(-10, 10),
};


module.exports = () => CallServer.post('templates', testData);
