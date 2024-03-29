import UserReducer, {ADD_USER, DELETE_USER, GET_CLIENT_INFO, GET_USERS, LOG_IN, LOG_OUT, SIGN_UP} from './UserReducer';
import PostReducer, {
  ADD_POST,
  DELETE_POST,
  GET_POST,
  LIKE_POST,
  LOAD_POST,
  UPDATE_POST,
  VISIBLE_POST
} from "./PostReducer";
import ContactMessageReducer, {
  ADD_CONTACT_MESSAGE,
  DELETE_CONTACT_MESSAGE,
  GET_CONTACT_MESSAGE,
  LOAD_CONTACT_MESSAGE,
  UPDATE_CONTACT_MESSAGE
} from "./ContactMessageReducer";
import CommentReducer, {
  ADD_COMMENT,
  DELETE_COMMENT,
  DISABLE_COMMENT,
  ENABLE_COMMENT,
  FLAG_COMMENT,
  HELPFUL_COMMENTS,
  UPDATE_COMMENT,
  VISIBLE_COMMENT,
} from "./CommentReducer";
import TemplateReducer, {
  ADD_TEMPLATE,
  DELETE_TEMPLATE,
  DISABLE_TEMPLATE,
  ENABLE_TEMPLATE,
  LOAD_TEMPLATES,
  SELECT_TEMPLATE_CATEGORIES,
  UPDATE_TEMPLATE
} from './TemplateReducer';
import WebPageReducer, {
  ADD_WEBPAGE,
  DELETE_WEBPAGE,
  DISABLE_WEBPAGE,
  ENABLE_WEBPAGE,
  FOLLOW_WEBPAGE,
  LOAD_WEBPAGE,
  LOAD_WEBPAGES,
  UNFOLLOW_WEBPAGE,
  UPDATE_WEBPAGE
} from './WebPageReducer';
import SnackbarReducer, {OPEN_CLOSE_SNACKBAR} from "./SnackbarReducer";
import Dialog2Reducer, {OPEN_CLOSE_DIALOG2} from "./Dialog2Reducer";
import {FORCE_UPDATE_CONTEXT} from "../MainContext";

export default (state, {type, payload}) => {
  switch (type) {
    case FORCE_UPDATE_CONTEXT:
      return {...state, loadTime: payload};
    case SIGN_UP:
    case LOG_IN:
    case LOG_OUT:
    case GET_CLIENT_INFO:
    case GET_USERS:
    case ADD_USER:
    case DELETE_USER:
      return UserReducer(state, {type, payload});
    case LOAD_POST:
    case DELETE_POST:
    case ADD_POST:
    case UPDATE_POST:
    case LIKE_POST:
    case GET_POST:
    case VISIBLE_POST:
      return PostReducer(state, {type, payload});
    case ADD_CONTACT_MESSAGE:
    case DELETE_CONTACT_MESSAGE:
    case GET_CONTACT_MESSAGE:
    case LOAD_CONTACT_MESSAGE:
    case UPDATE_CONTACT_MESSAGE:
      return ContactMessageReducer(state, {type, payload});
    case FLAG_COMMENT:
    case ENABLE_COMMENT:
    case DISABLE_COMMENT:
    case DELETE_COMMENT:
    case ADD_COMMENT:
    case HELPFUL_COMMENTS:
    case UPDATE_COMMENT:
    case VISIBLE_COMMENT:
      return CommentReducer(state, {type, payload});
    case ADD_TEMPLATE:
    case LOAD_TEMPLATES:
    case SELECT_TEMPLATE_CATEGORIES:
    case ENABLE_TEMPLATE:
    case DISABLE_TEMPLATE:
    case UPDATE_TEMPLATE:
    case DELETE_TEMPLATE:
      return TemplateReducer(state, {type, payload});
    case ADD_WEBPAGE:
    case LOAD_WEBPAGES:
    case LOAD_WEBPAGE:
    case FOLLOW_WEBPAGE:
    case UNFOLLOW_WEBPAGE:
    case ENABLE_WEBPAGE:
    case DISABLE_WEBPAGE:
    case UPDATE_WEBPAGE:
    case DELETE_WEBPAGE:
      return WebPageReducer(state, {type, payload});
    case OPEN_CLOSE_SNACKBAR:
      return SnackbarReducer(state, {type, payload});
    case OPEN_CLOSE_DIALOG2:
      return Dialog2Reducer(state, {type, payload});
    default:
      return state;
  }
};
