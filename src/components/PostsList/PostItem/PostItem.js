import React, {useContext} from "react";
import {Card, CardContent, Divider, Grid} from "project-elements";
import usePostItemStyle from './PostItem.style';
import CommentsList from "../../CommentsList";
import CommentsAddNew from "../../CommentsList/CommentsAddNew";
import PostContent from "./PostContent";
import {MainContext} from "../../../contexts/MainContext";

const PostItem = props => {
  const {client} = useContext(MainContext);
  const classes = usePostItemStyle();
  const {post} = props;
  const {comments} = post;

  const isAdmin = client.role === 'admin';
  const isAuthor = client.role === 'user' && post.author._id === client._id;
  const isReader = !isAdmin && !isAuthor;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container className={classes.grid} spacing={2} alignItems='center'>
          <PostContent post={post}/>
          {comments && comments.length > 0 && (
            <>
              <Grid item xs={12}>
                <Divider/>
              </Grid>
              <CommentsList comments={comments} post_id={post._id}/>
            </>
          )}
          {(isAuthor || isReader) && (
            <>
              <Grid item xs={12}>
                <Divider/>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.margin}>
                  <CommentsAddNew post_id={post._id}/>
                </div>
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PostItem;
