import CallServer from "../../../src/utils/CallServer";
import TokenManager from "../../../src/utils/TokenManager";
import {adminLogin} from "../../helpers/admin";
import {userLogin} from "../../helpers/user";

const newPassword = 'newPassword';
const DEMO_USER_DATA = require('../../demo_data/user_data1.json');

let oneTestUser = {};
let allUsers = [];
let testIndex = 0;

describe('Manage users', () => {
  test('Admin login', async () => {
    const {success} = await adminLogin();;
    CallServer.setToken(TokenManager.getToken('demo_admin_token'));
    expect(success).toBe(true);
  });
  test(++testIndex + ') List all users', async () => {
    const request = await CallServer.get('users');
    const {success, users} = request;
    allUsers = users;
    oneTestUser = users[users.length - 1];
    expect(success).toBe(true);
    expect(users.constructor.name).toBe('Array');
  });

  test(++testIndex + ') Should not include admin', () => {
    const existingAdmin = allUsers.some(user => user.role === 'admin');
    expect(existingAdmin).toBe(false);
  });

  test(++testIndex + ') Change user password & test login', async () => {
    const data = {mode: 'updatePasswordByAdmin', newPassword};
    const request = await CallServer.put('changeUserPassword/' + oneTestUser._id, data);
    const {success, updatedUser} = request;
    expect(success).toBe(true);
    expect(updatedUser._id).toBe(oneTestUser._id);
    const loginData = {email: oneTestUser.email, password: newPassword}
    const request2 = await CallServer.post('login', loginData);
    const success2 = request2.success;
    const token = request2.token;
    expect(success2).toBe(true);
    expect(token.length).toBeGreaterThan(10);
  });

  test(++testIndex + ') Disable a user & test login', async () => {
    const request = await CallServer.put('setUserEnabled/' + oneTestUser._id + '/disable');
    const {success, updatedUser} = request;
    expect(success).toBe(true);
    expect(updatedUser._id).toBe(oneTestUser._id);
    expect(updatedUser.enabled).toBe(false);
    const loginData = {email: oneTestUser.email, password: newPassword}
    const request2 = await CallServer.post('login', loginData);
    const code = request2.code;
    expect(code).toBe('ACCOUNT_DISABLED');
    await CallServer.put('setUserEnabled/' + oneTestUser._id + '/enable');
  });

  test(++testIndex + ') Enable a user & test login', async () => {
    const request = await CallServer.put('setUserEnabled/' + oneTestUser._id + '/enable');
    const {success, updatedUser} = request;
    expect(success).toBe(true);
    expect(updatedUser._id).toBe(oneTestUser._id);
    expect(updatedUser.enabled).toBe(true);
    const loginData = {email: oneTestUser.email, password: newPassword}
    const request2 = await CallServer.post('login', loginData);
    const success2 = request2.success;
    const token = request2.token;
    expect(success2).toBe(true);
    expect(token.length).toBeGreaterThan(10);
  });

  test(++testIndex + ') Create a user by admin', async () => {
    const request = await CallServer.post('users', DEMO_USER_DATA);
    const {success, createdUser} = request;
    expect(createdUser._id.length).toBeGreaterThan(10);
    expect(success).toBe(true);
  });

  test(++testIndex + ') Try to login with just created user', async () => {
    const loginData = {email: DEMO_USER_DATA.email, password: DEMO_USER_DATA.password}
    const request2 = await userLogin(loginData)
    const success2 = request2.success;
    const token = request2.token;
    expect(success2).toBe(true);
    expect(token.length).toBeGreaterThan(10);
  });

  test(++testIndex + ') Delete a user by admin', async () => {
    CallServer.setToken(TokenManager.getToken('demo_admin_token'));
    const request3 = await CallServer.delete('users/' + DEMO_USER_DATA.email);
    const success3 = request3.success;
    expect(success3).toBe(true);
  });

});