export const FLAG_COMMENT = 'FLAG_COMMENT';
export const ENABLE_COMMENT = 'ENABLE_COMMENT';
export const DISABLE_COMMENT = 'DISABLE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const HELPFUL_COMMENTS = 'HELPFUL_COMMENTS';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

const CommentReducer = (state, {type, payload}) => {
  switch (type) {
    case FLAG_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => {
          post.comments.map(comment => {
            if (comment.id === payload) return {...comment, flagCount: comment.flagCount++};
            return comment
          });
          return post;
        })
      };
    case ENABLE_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => {
          post.comments.map(comment => {
            if (comment.id === payload) return {...comment, enabled: true};
            return comment
          });
          return post;
        })
      };
    case DISABLE_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => {
          post.comments.map(comment => {
            if (comment.id === payload) return {...comment, enabled: false};
            return comment
          });
          return post;
        })
      };
    case DELETE_COMMENT:
      const originalPost = state.post;
      if (originalPost && originalPost._id === payload.post_id)
        originalPost.comments = originalPost.comments.filter(comment => comment._id !== payload.id);
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === payload.post_id)
            post.comments = post.comments.filter(comment => comment._id !== payload.id);
          return post;
        }),
        post: originalPost
      };
    case ADD_COMMENT:
      const originalPost2 = state.post;
      if (originalPost2 && originalPost2._id === payload.post_id)
        originalPost2.comments = originalPost2.comments.concat(payload.comment);
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === payload.post_id) post.comments = post.comments.concat(payload.comment);
          return post;
        }),
        post: originalPost2
      };
    case HELPFUL_COMMENTS:
      const originalPost3 = state.post;
      if (originalPost3 && originalPost3._id === payload.post_id) {
        (originalPost3.comments || []).map(comment => {
          if (comment._id === payload.comment_id) {
            comment.cmtHelpfuls = payload.cmtHelpfuls;
            comment.cmtUnHelpfuls = payload.cmtUnHelpfuls;
          }
          return comment;
        });
      }
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === payload.post_id) {
            (post.comments || []).map(comment => {
              if (comment._id === payload.comment_id) {
                comment.cmtHelpfuls = payload.cmtHelpfuls;
                comment.cmtUnHelpfuls = payload.cmtUnHelpfuls;
              }
              return comment;
            });
          }
          return post;
        }),
        post: originalPost3
      };
    case UPDATE_COMMENT:
      const originalPost4 = state.post;
      console.log('if (originalPost4 && originalPost4._id === payload.post_id) {', originalPost4);
      if (originalPost4 && originalPost4._id === payload.post_id) {
        const existingIndex = originalPost4.comments.findIndex(comment => comment._id === payload.comment_id);
        if(existingIndex > -1) {
          originalPost4.comments[existingIndex] = payload.updatedComment;
        }
      }
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === payload.post_id) {
            const existingIndex = post.comments.findIndex(comment => comment._id === payload.comment_id);
            if(existingIndex > -1) {
              post.comments[existingIndex] = payload.updatedComment;
            }
          }
          return post;
        }),
        post: originalPost4
      };
    default:
      return state;
  }
};

export default CommentReducer;