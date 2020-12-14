export const LOAD_CONTACT_MESSAGE = 'LOAD_CONTACT_MESSAGE';
export const DELETE_CONTACT_MESSAGE = 'DELETE_CONTACT_MESSAGE';
export const ADD_CONTACT_MESSAGE = 'ADD_CONTACT_MESSAGE';
export const UPDATE_CONTACT_MESSAGE = 'UPDATE_CONTACT_MESSAGE';
export const LIKE_CONTACT_MESSAGE = 'LIKE_CONTACT_MESSAGE';
export const GET_CONTACT_MESSAGE = 'GET_CONTACT_MESSAGE';

const ContactMessageReducer = (state, {type, payload}) => {
  switch (type) {
    case LOAD_CONTACT_MESSAGE:
      return {
        ...state,
        contact_messages: payload.contact_messages,
      };
    case DELETE_CONTACT_MESSAGE:
      return {
        ...state,
        contact_messages: state.contact_messages.filter(contact_message => contact_message._id !== payload)
      };
    case ADD_CONTACT_MESSAGE:
      return {
        ...state,
        contact_messages: [].concat(payload, state.contact_messages)
      };
    case UPDATE_CONTACT_MESSAGE:
      const originalContactMessages = [...(state.contact_messages || [])];
      const existingIndex = originalContactMessages.findIndex(contact_message => contact_message._id === payload._id);
      if (existingIndex > -1) {
        originalContactMessages[existingIndex] = payload.updatedContactMessage;
      }
      return {
        ...state,
        contact_messages: originalContactMessages,
        contact_message: payload.updatedContactMessage,
      };
    case GET_CONTACT_MESSAGE:
      return {
        ...state,
        contact_message: payload
      };
    default:
      return state;
  }
};

export default ContactMessageReducer;
