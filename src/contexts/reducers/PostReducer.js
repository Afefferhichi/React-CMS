export const LOAD_POST = 'LOAD_POST';
export const DELETE_POST = 'DELETE_POST';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const LIKE_POST = 'LIKE_POST';
export const GET_POST = 'GET_POST';

const PostReducer = (state, {type, payload}) => {
  switch (type) {
    case LOAD_POST:
      return {
        ...state,
        posts: payload.posts
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload)
      };
    case ADD_POST:
      return {
        ...state,
        posts: (state.posts || []).concat(payload)
      };
    case UPDATE_POST:
      const originalPosts = [...(state.posts || [])];
      const existingIndex = originalPosts.findIndex(post => post._id === payload._id);
      if (existingIndex > -1) {
        originalPosts[existingIndex] = payload.updatedPost;
      }
      return {
        ...state,
        posts: originalPosts,
        post: payload.updatedPost,
      };
    case LIKE_POST:
      const originalPosts2 = [...(state.posts || [])];
      originalPosts2.map(post => {
        if (post._id === payload.post_id) {
          post.pstLikes = payload.pstLikes;
          post.pstDislikes = payload.pstDislikes;
        }
        return post;
      });
      const originalPost = state.post;
      if(state.post && state.post._id === payload.post_id) {
        originalPost.pstLikes = payload.pstLikes;
        originalPost.pstDislikes = payload.pstDislikes;
      }
      return {
        ...state,
        posts: originalPosts2,
        post: originalPost,
      };
    case GET_POST:
      return {
        ...state,
        post: payload
      };
    default:
      return state;
  }
};

export default PostReducer;