import React from "react";
import {Card, CardContent, Divider, Grid} from "project-elements";
import usePostItemStyle from './PostItem.style';
import CommentsList from "../../CommentsList";
import CommentsAddNew from "../../CommentsList/CommentsAddNew";
import PostContent from "./PostContent";

const PostItem = props => {
  const classes = usePostItemStyle();
  const {post} = props;
  const {comments} = post;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container className={classes.grid} spacing={2} alignItems='center'>
          <PostContent post={post} />
          {comments && comments.length > 0 && (
            <>
              <Grid item xs={12}>
                <Divider/>
              </Grid>
              <CommentsList comments={comments} post_id={post._id}/>
            </>
          )}
          <Grid item xs={12}>
            <Divider/>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.margin}>
              <CommentsAddNew post_id={post._id}/>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PostItem;
