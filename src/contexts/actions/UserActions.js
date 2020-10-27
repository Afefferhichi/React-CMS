import constants from '../../config/constants'
import {ADD_USER, DELETE_USER, GET_CLIENT_INFO, GET_USERS, LOG_IN, LOG_OUT, SIGN_UP} from "../reducers/UserReducer";
import CallServer from "../../utils/CallServer";

const signUp = async (formData, dispatch) => {
  try {
    const request = await CallServer.post('register', formData);
    const {success, createdUser, token} = request;
    if (success) {
      localStorage.setItem('token', token);
      dispatch({type: SIGN_UP, payload: {...createdUser, type: 'user'}});
    } else throw request;
  } catch (err) {
    throw err;
  }
};

const login = async (formData, dispatch) => {
  const {email, password} = formData;
  try {
    let res = await fetch(constants.API_SERVER + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    if (!res.ok) {
      throw (await res.json());
    }
    res = await res.json();
    localStorage.setItem('token', res.token);
    dispatch({type: LOG_IN, payload: {...res.user, type: res.user.role}});
  } catch (err) {
    throw err;
  }
};

const getClientInfo = async (dispatch) => {
  try {
    const request = await CallServer.get('profile');
    if (request.success) {
      dispatch({type: GET_CLIENT_INFO, payload: request.user});
    }
  } catch (err) {
    throw err;
  }
};

const logout = async (dispatch) => {
  try {
    dispatch({type: LOG_OUT});
    localStorage.removeItem('token');
  } catch (err) {
    throw err;
  }
};

const getUsers = async (dispatch) => {
  try {
    const request = await CallServer.get('users');
    const {success, users} = request;
    if (success) {
      dispatch({type: GET_USERS, payload: users})
    } else throw request;
  } catch (err) {
    throw err;
  }
};

const addUser = async (formData, dispatch) => {
  try {
    const request = await CallServer.post('users', formData);
    const {success, createdUser} = request;
    if (success) {
      dispatch({type: ADD_USER, payload: createdUser})
    } else throw request;
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (id, dispatch) => {
  try {
    const request = await CallServer.delete('users/' + id);
    const {success, deletedUser} = request;
    if (success) {
      dispatch({type: DELETE_USER, payload: deletedUser._id});
    } else throw request;
  } catch (err) {
    throw err;
  }
};


const updateAccount = async (formData, dispatch) => {
  const {newEmail, newPassword} = formData;
  try {
    if (newEmail) console.log(newEmail);
    if (newPassword) console.log(newPassword);
  } catch (err) {
    throw err;
  }
};


export default {
  signUp,
  login,
  logout,
  getUsers,
  addUser,
  deleteUser,
  updateAccount,
  getClientInfo
}