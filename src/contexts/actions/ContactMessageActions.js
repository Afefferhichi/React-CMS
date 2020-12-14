import {
  LOAD_CONTACT_MESSAGE,
  DELETE_CONTACT_MESSAGE,
  ADD_CONTACT_MESSAGE,
  UPDATE_CONTACT_MESSAGE,
  GET_CONTACT_MESSAGE,
} from "../reducers/ContactMessageReducer";
import CallServer from '../../utils/CallServer';
import {dispatch2} from "../MainContext";

const loadContactMessages = async (conditions) => {
  try {
    let query = '';
    if (conditions)
    {
      for (let key in conditions) {
        query += `&${key}=${conditions[key]}`;
      }
    }
    const request = await CallServer.get('contact_messages?' + query);
    if (request.success) {
      const {messages} = request;
      await dispatch2({type: LOAD_CONTACT_MESSAGE, payload: {contact_messages: messages}});
    } else {
      throw request;
    }
  } catch (err) {
    throw err;
  }
};

const addContactMessage = async (contact_messageData, webpage_id) => {
  try {
    const request = await CallServer.post('/contact_messages', contact_messageData);
    if (request.success) {
      const {createdContactMessage} = request;
      await dispatch2({type: ADD_CONTACT_MESSAGE, payload: createdContactMessage});
    } else {
      throw request;
    }
  } catch (err) {
    throw err;
  }
};

const updateContactMessage = async (id, contact_messageData) => {
  try {
    const request = await CallServer.put('contact_messages/' + id, contact_messageData);
    if (request.success) {
      const {updatedContactMessage} = request;
      await dispatch2({type: UPDATE_CONTACT_MESSAGE, payload: {_id: id, updatedContactMessage}});
    } else {
      throw request;
    }
  } catch (err) {
    throw err;
  }
};

const deleteContactMessage = async (id) => {
  try {
    const request = await CallServer.delete('contact_messages/' + id);
    if (request.success) {
      const {deletedContactMessage} = request;
      await dispatch2({type: DELETE_CONTACT_MESSAGE, payload: deletedContactMessage._id});
    } else {
      throw request;
    }
  } catch (err) {
    throw err;
  }
};

const getContactMessage = async (contact_message_id) => {
  try {
    const request = await CallServer.get('contact_messages/' + contact_message_id);
    if (request.success) {
      const {contact_message} = request;
      await dispatch2({type: GET_CONTACT_MESSAGE, payload: contact_message});
    } else {
      throw request;
    }
  } catch (err) {
    throw err;
  }
};

export default {
  loadContactMessages,
  deleteContactMessage,
  addContactMessage,
  updateContactMessage,
  getContactMessage,
};
