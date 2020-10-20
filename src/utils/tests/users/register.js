const CallServer = require("../../CallServer").default;

const testData2 = {
  firstname: 'Nahrae',
  lastname: 'Jin',
  email: 'jinnahrae@gmail.com',
  telephone: '13241234',
  address: 'asdfasdf',
  password: 'fofjrj123',
  cnfPassword: 'fofjrj123',
  organisation: 'organisation123',

};
module.exports = () => CallServer.post('register', testData2);
