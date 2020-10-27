
module.exports = [
  APICall => args => {
    const updateUserData2 = {
      mode: 'updatePasswordByAdmin',
      newPassword: args[1],
    };
    return APICall.put('changeUserPassword/' + args[0], updateUserData2)
  },
  result => result
];

