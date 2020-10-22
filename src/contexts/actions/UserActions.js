import constants from '../../config/constants'
import {ADD_USER, DELETE_USER, GET_CLIENT_INFO, GET_USERS, LOG_IN, LOG_OUT, SIGN_UP} from "../reducers/UserReducer";
import CallServer from "../../utils/CallServer";

const signUp = async (formData, dispatch) => {
  const {firstname, lastname, email, password, cnfPassword, address, organisation, telephone} = formData;
  try {
    let res = await fetch(constants.API_SERVER + 'register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        cnfPassword,
        address,
        organisation,
        telephone
      })
    });
    if (!res.ok) throw (await res.json())
    res = await res.json();
    localStorage.setItem('token', res.token);
    dispatch({type: SIGN_UP, payload: {...res.user, type: 'user'}});
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
    let res = await fetch(constants.API_SERVER + 'users', {
      headers: {
        'token': localStorage.getItem('token')
      }
    });
    if (!res.ok) throw (await res.json())
    res = await res.json();
    dispatch({type: GET_USERS, payload: res})
  } catch (err) {
    throw err;
  }
};

const addUser = async (formData, dispatch) => {
  const {firstname, lastname, email, password, address, organisation, telephone} = formData;
  try {
    let res = await fetch(constants.API_SERVER + 'addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        address,
        organisation,
        telephone
      })
    });
    if (!res.ok) throw (await res.json())
    res = await res.json();
    dispatch({type: ADD_USER, payload: res.user})
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (id, dispatch) => {
  try {
    let res = await fetch(constants.API_SERVER + `deleteUser/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      }
    });
    if (!res.ok) throw (await res.json())
    dispatch({type: DELETE_USER, payload: id});
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