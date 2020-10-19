import React from "react";
import CommentItem from "./CommentItem";
import {Grid} from 'project-elements';

const CommentsList = props => {
  const {comments, post_id} = props;
  return (
    <Grid item xs={12}>
      {comments && comments.map((comment, index) => (
        <CommentItem
          key={String(index)}
          comment={comment}
          post_id={post_id}
        />
      ))}
    </Grid>
  );
};

export default CommentsList;