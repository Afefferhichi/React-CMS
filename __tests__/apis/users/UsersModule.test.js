const CallServer = require("../../../src/utils/CallServer").default;
const TokenManager = require("../../../src/utils/TokenManager").default;

const DEMO_USER_DATA = require('../../demo_data/user_data2.json');

const {adminLogin} = require("../../helpers/admin");
const {userLogin} = require("../../helpers/user");

let testIndex = 0;

describe('User - Register', () => {

  test('Before start testing of users', async () => {
    await adminLogin();
    CallServer.setToken(TokenManager.getToken('demo_admin_token'));
    await CallServer.delete('users/' + DEMO_USER_DATA.newEmail);
  });

  test(++testIndex + ') should fail to login', async () => {
    const request = await userLogin();
    const {code} = request;
    expect(code).toBe('LOGIN_FAILED');
  });

  test(++testIndex + ') Sign up with demo data', async () => {
    const request = await CallServer.post('register', DEMO_USER_DATA);
    const {success, createdUser} = request;
    DEMO_USER_DATA._id = createdUser._id;
    expect(success).toBe(true);
  });

  test(++testIndex + ') login', async () => {
    const {success, token} = await userLogin();
    TokenManager.setToken('demo_user_token', token);
    expect(success).toBe(true);
    expect(token.length).toBeGreaterThan(10);
  });

  test(++testIndex + ') change user password', async () => {
    let updateData = {
      mode: 'updatePassword',
      currentPassword: DEMO_USER_DATA.password,
      newPassword: DEMO_USER_DATA.newPassword,
    }
    CallServer.setToken(TokenManager.getToken());
    let request = await CallServer.put('users/' + DEMO_USER_DATA._id, updateData);
    let {success} = request, token;
    !success && console.log('request', request);
    expect(success).toBe(true);

    request = await userLogin({password: DEMO_USER_DATA.newPassword});
    expect(request.success).toBe(true);

    CallServer.setToken(TokenManager.getToken());

    request = await CallServer.put('users/' + DEMO_USER_DATA._id,
      {...updateData, newPassword: DEMO_USER_DATA.password, currentPassword: DEMO_USER_DATA.newPassword});
    success = request.success;
    token = request.token;
    TokenManager.setToken('demo_user_token', token);
    !success && console.log('request', request);
    expect(success).toBe(true);
    expect(token.length).toBeGreaterThan(10);
  });

  test(++testIndex + ') change user email', async () => {
    let request = await userLogin();
    let success = request.success;
    let token = request.token;
    TokenManager.setToken('demo_user_token', token);
    !success && console.log('request', request);
    expect(success).toBe(true);

    let updateData = {
      mode: 'updateEmail',
      currentEmail: DEMO_USER_DATA.email,
      newEmail: DEMO_USER_DATA.newEmail
    };
    CallServer.setToken(TokenManager.getToken('demo_user_token'));
    request = await CallServer.put('users/' + DEMO_USER_DATA._id, updateData);

    !success && console.log('request 1', request);
    expect(success).toBe(true);

    request = await userLogin({password: DEMO_USER_DATA.password, email: DEMO_USER_DATA.newEmail});
    expect(request.success).toBe(true);

    updateData = {
      mode: 'updateEmail',
      newEmail: DEMO_USER_DATA.email,
      currentEmail: DEMO_USER_DATA.newEmail
    };
    request = await CallServer.put('users/' + DEMO_USER_DATA._id, updateData);
    success = request.success;
    !success && console.log('request 3', request);
    expect(success).toBe(true);
  });

  test(++testIndex + ') upload user avatar', async () => {
    const fs = require('fs');
    const FormData = require('form-data');

    await userLogin();

    const updateData = new FormData();
    updateData.append('mode', 'updateAvatar');
    updateData.append('attachments', fs.createReadStream(DEMO_USER_DATA.avatarPath))
    const stat = fs.statSync(DEMO_USER_DATA.avatarPath);
    const originalFileSize = stat.size;

    const request = await CallServer.putWithFile('users/' + DEMO_USER_DATA._id, updateData);
    const {success, updatedUser} = request;
    expect(success).toBe(true);
    expect(originalFileSize).toBe(updatedUser.photo.size);
  });

  test(++testIndex + ') get profile', async () => {
    await userLogin();
    const request = await CallServer.get('profile');
    const {success, user} = request;
    expect(success).toBe(true);
    expect(user._id.length).toBeGreaterThan(10);
  });

  test(++testIndex + ') remove user avatar', async () => {
    await userLogin();
    const updateData = {
      'mode': 'updateAvatar'
    };
    const request = await CallServer.put('users/' + DEMO_USER_DATA._id, updateData);
    const {success, updatedUser} = request;
    expect(success).toBe(true);
    expect(updatedUser.photo).toBe(null);
  });

  test(++testIndex + ') Remove the demo user', async () => {
    await adminLogin();
    await CallServer.delete('users/' + DEMO_USER_DATA.email);
  });

  test(++testIndex + ') should fail to login', async () => {
    CallServer.setToken(TokenManager.getToken('demo_user_token'));
    const {code} = await userLogin();
    expect(code).toBe('LOGIN_FAILED');
  });

});
