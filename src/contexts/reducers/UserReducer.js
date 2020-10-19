export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const GET_USERS = 'GET_USERS';
export const ADD_USER = 'ADD_USER';
export const GET_CLIENT_INFO = 'GET_CLIENT_INFO';
export const DELETE_USER = 'DELETE_USER';

const UserReducer = (state, {type, payload}) => {
  switch (type) {
    case SIGN_UP:
      return {...state, client: payload};
    case LOG_IN:
      return {...state, client: payload};
    case GET_CLIENT_INFO:
      return {...state, client: payload};
    case LOG_OUT:
      return {...state, client: null};
    case GET_USERS:
      return {...state, users: payload};
    case ADD_USER:
      return {...state, users: state.users.push(payload)};
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== payload)
      };
    default:
      return state;
  }
};

export default UserReducer;