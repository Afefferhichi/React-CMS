import {
  ADD_COMMENT,
  DELETE_COMMENT,
  DISABLE_COMMENT,
  ENABLE_COMMENT,
  FLAG_COMMENT,
  HELPFUL_COMMENTS, UPDATE_COMMENT,
} from "../reducers/CommentReducer";
import CallServer from "../../utils/CallServer";

const flagComment = async (id, dispatch) => {
  try {
    dispatch({type: FLAG_COMMENT, payload: id});
  } catch (err) {
    throw err;
  }
}

const enableComment = async (id, dispatch) => {
  try {
    dispatch({type: ENABLE_COMMENT, payload: id});
  } catch (err) {
    throw err;
  }
}

const disableComment = async (id, dispatch) => {
  try {
    dispatch({type: DISABLE_COMMENT, payload: id});
  } catch (err) {
    throw err;
  }
}

const deleteComment = async ({id, post_id}, dispatch) => {
  try {
    const request = await CallServer.delete('comments/' + id);
    if (request.success) {
      dispatch({type: DELETE_COMMENT, payload: {id, post_id}});
    }
  } catch (err) {
    throw err;
  }
};

const addComment = async ({post_id, comment}, dispatch) => {
  try {
    const request = await CallServer.postWithFile('posts/' + post_id + '/comments', comment)
    if (request.success) {
      dispatch({type: ADD_COMMENT, payload: {post_id, comment: request.createdComment}});
    }
  } catch (err) {
    throw err;
  }
};

const helpfulComment = async ({post_id, comment_id, helpful}, dispatch) => {
  try {
    const request = await CallServer.get('comments/' + comment_id + '/' + (helpful === true ? 'helpful' : 'unhelpful'));
    if (request.success) {
      const {cmtHelpfuls, cmtUnHelpfuls} = request;
      dispatch({type: HELPFUL_COMMENTS, payload: {post_id, comment_id, cmtHelpfuls, cmtUnHelpfuls}});
    }
  } catch (err) {
    throw err;
  }
};

const updateComment = async ({post_id, comment_id, comment}, dispatch) => {
  try {
    const request = await CallServer.putWithFile('comments/' + comment_id, comment)
    if (request.success) {
      const {updatedComment} = request;
      await dispatch({type: UPDATE_COMMENT, payload: {post_id, comment_id, updatedComment}});
    }
  } catch (err) {
    throw err;
  }
};

export default {
  flagComment,
  enableComment,
  disableComment,
  deleteComment,
  addComment,
  helpfulComment,
  updateComment
};

