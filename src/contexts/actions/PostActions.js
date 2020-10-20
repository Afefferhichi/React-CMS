import {
  ADD_POST,
  DELETE_POST,
  GET_POST,
  LIKE_POST,
  LOAD_POST,
  UPDATE_POST,
  VISIBLE_POST
} from "../reducers/PostReducer";
import CallServer from '../../utils/CallServer';

const loadPosts = async (dispatch) => {
  try {
    const request = await CallServer.get('posts');
    if (request.success) {
      const {posts} = request;
      await dispatch({type: LOAD_POST, payload: {posts}});
    } else {
      throw request;
    }
  } catch (err) {
    throw err;
  }
};

const addPost = async (postData, dispatch) => {
  try {
    const request = await CallServer.postWithFile('posts', postData);
    if (request.success) {
      const {createdPost} = request;
      await dispatch({type: ADD_POST, payload: createdPost});
    } else {
      throw request;
    }
  } catch (err) {
    throw err;
  }
};

const updatePost = async (id, postData, dispatch) => {
  try {
    const request = await CallServer.putWithFile('posts/' + id, postData);
    if (request.success) {
      const {updatedPost} = request;
      await dispatch({type: UPDATE_POST, payload: {_id: id, updatedPost}});
    } else {
      throw request;
    }
  } catch (err) {
    throw err;
  }
};

const deletePost = async (id, dispatch) => {
  try {
    const request = await CallServer.delete('posts/' + id);
    if (request.success) {
      const {deletedPost} = request;
      await dispatch({type: DELETE_POST, payload: deletedPost._id});
    } else {
      throw request;
    }
  } catch (err) {
    throw err;
  }
};

const likePost = async ({post_id, like}, dispatch) => {
  try {
    const request = await CallServer.get('posts/' + post_id + '/' + (like === true ? 'like' : 'dislike'));
    if (request.success) {
      const {pstLikes, pstDislikes} = request;
      await dispatch({type: LIKE_POST, payload: {post_id, pstLikes, pstDislikes}});
    } else {
      throw request;
    }
  } catch (err) {
    throw err;
  }
};

const getPost = async (post_id, dispatch) => {
  try {
    const request = await CallServer.get('posts/' + post_id);
    if (request.success) {
      const {post} = request;
      await dispatch({type: GET_POST, payload: post});
    } else {
      throw request;
    }
  } catch (err) {
    throw err;
  }
};

const setVisiblePost = async (post_id, visibleMethod, dispatch) => {
  try {
    const request = await CallServer.put('admin/posts/' + post_id + '/' + visibleMethod);
    if (request.success) {
      const {updatedPost} = request;
      await dispatch({type: VISIBLE_POST, payload: updatedPost});
    } else {
      throw request;
    }
  } catch (err) {
    throw err;
  }
};

export default {
  loadPosts,
  deletePost,
  addPost,
  updatePost,
  likePost,
  getPost,
  setVisiblePost
};
