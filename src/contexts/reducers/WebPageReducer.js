export const LOAD_WEBPAGES = 'LOAD_WEBPAGES';
export const ADD_WEBPAGE = 'ADD_WEBPAGE';
export const ENABLE_WEBPAGE = 'ENABLE_WEBPAGE';
export const DISABLE_WEBPAGE = 'DISABLE_WEBPAGE';
export const UPDATE_WEBPAGE = 'UPDATE_WEBPAGE';
export const DELETE_WEBPAGE = 'DELETE_WEBPAGE';

const WebPageReducer = (state, {type, payload}) => {
  switch (type) {
    case LOAD_WEBPAGES:
      return {
        ...state,
        webpages: payload
      }
    case ADD_WEBPAGE:
      return {
        ...state,
        webpages: state.webpages.concat(payload)
      }
    case ENABLE_WEBPAGE:
      return {
        ...state,
        webpages: state.webpages.map(webpage => {
          if (webpage._id === payload) return {...webpage, enabled: true};
          return webpage;
        })
      }
    case DISABLE_WEBPAGE:
      return {
        ...state,
        webpages: state.webpages.map(webpage => {
          if (webpage._id === payload) return {...webpage, enabled: false};
          return webpage;
        })
      }
    case UPDATE_WEBPAGE:
      return {
        ...state,
        webpages: state.webpages.map(webpage => {
          if (webpage._id === payload._id) return payload;
          return webpage;
        })
      }
    case DELETE_WEBPAGE:
      return {
        ...state,
        webpages: state.webpages.filter(webpage => webpage._id !== payload)
      }
    default:
      return state;
  }
};

export default WebPageReducer;
