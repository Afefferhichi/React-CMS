const dotenv = require('dotenv');
dotenv.config();

const BASIC_USER_DATA = {
  firstname: '',
  lastname: 'Last',
  email: 'afef.ferchichi@gmail.com',
  telephone: '13241234',
  address: 'asdfasdf',
  password: '',
  cnfPassword: '',
  organisation: 'organisation123',
};

const getUserData = (arg1) => {
  let email, password;
  const index = Number(arg1);
  if (index === 0) {
    email = process.env.USER_EMAIL;
    password = process.env.USER_PASSWORD;
  } else if (index === 1) {
    email = process.env.USER2_EMAIL;
    password = process.env.USER2_PASSWORD;
  } else {
    return false;
  }
  const userData = {...BASIC_USER_DATA};
  userData.email = email;
  userData.password = password;
  userData.cnfPassword = password;
  userData.firstname = getNameFromEmail(email);
  if (userData.firstname === false) {
    return false;
  }
  return userData;
}

const getNameFromEmail = (email) => {
  try {
    const name = email.split('@')[0];
    return name[0].toUpperCase() + name.substr(1);
  } catch (e) {
    return false;
  }
}

module.exports = [
  CallServer => (arguments) => {
    const userData = getUserData(arguments[0]);
    if (userData === false) {
      console.log('Invalid arguments');
      return;
    }
    return CallServer.post('register', userData)
  },
  result => result
];
