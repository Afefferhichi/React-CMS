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
import CommentReducer, {
  ADD_COMMENT,
  DELETE_COMMENT,
  DISABLE_COMMENT,
  ENABLE_COMMENT,
  FLAG_COMMENT, HELPFUL_COMMENTS, UPDATE_COMMENT, VISIBLE_COMMENT,
} from "./CommentReducer";
import TemplateReducer, {
  ADD_TEMPLATE,
  DELETE_TEMPLATE,
  DISABLE_TEMPLATE,
  ENABLE_TEMPLATE, LOAD_TEMPLATES,
  UPDATE_TEMPLATE
} from './TemplateReducer';
import SnackbarReducer, {OPEN_CLOSE_SNACKBAR} from "./SnackbarReducer";
import Dialog2Reducer, {OPEN_CLOSE_DIALOG2} from "./Dialog2Reducer";

export default (state, {type, payload}) => {
  switch (type) {
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
    case ENABLE_TEMPLATE:
    case DISABLE_TEMPLATE:
    case UPDATE_TEMPLATE:
    case DELETE_TEMPLATE:
      return TemplateReducer(state, {type, payload});
    case OPEN_CLOSE_SNACKBAR:
      return SnackbarReducer(state, {type, payload});
    case OPEN_CLOSE_DIALOG2:
      return Dialog2Reducer(state, {type, payload});
    default:
      return state;
  }
};