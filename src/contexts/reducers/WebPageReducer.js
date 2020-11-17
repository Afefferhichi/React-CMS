export const LOAD_WEBPAGES = 'LOAD_WEBPAGES';
export const LOAD_WEBPAGE = 'LOAD_WEBPAGE';
export const FOLLOW_WEBPAGE = 'FOLLOW_WEBPAGE';
export const UNFOLLOW_WEBPAGE = 'UNFOLLOW_WEBPAGE';
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
    case LOAD_WEBPAGE:
      return {
        ...state,
        webpage: payload
      }
    case FOLLOW_WEBPAGE:
    case UNFOLLOW_WEBPAGE:
      const webpage = {...state.webpage};
      webpage.followers = payload;
      return {
        ...state,
        webpage
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
