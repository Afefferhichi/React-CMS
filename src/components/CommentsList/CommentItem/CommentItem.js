import React from "react";
import {Avatar, Container, Grid, Typography} from "project-elements";
import useCommentItemStyle from './CommentItem.style';
import DownloadLinkItem from "../../DownloadLinkItem";
import constants from "../../../config/constants";
import EditButton from "../../PostCommentButtons/EditButton";
import DeleteButton from "../../PostCommentButtons/DeleteButton";
import LikeButton from "../../PostCommentButtons/LikeButton";

const CommentItem = props => {
  const classes = useCommentItemStyle();
  const {comment} = props;
  const {
    cmtValue = 'Comment',
    cmtHelpfuls,
    cmtUnHelpfuls,
    attachments,
    author
  } = comment;

  return (
    <Grid container className={classes.container} spacing={1} alignItems='center'>
      <Grid item xs={1}>
        <Avatar>
          {!author
            ? 'U'
            : (
              <img
                width={50}
                alt={''}
                src={constants.API_SERVER + 'attachments/' + author.photo}/>
            )
          }
        </Avatar>
      </Grid>
      <Grid item xs={7}>
        <Typography>{cmtValue}</Typography>
      </Grid>
      <Grid item xs={1} container alignItems={'center'} justify={'center'}>
        <LikeButton itemType={'comment'} mode={'helpful'} likeItem={comment} likes={cmtHelpfuls}/>
      </Grid>
      <Grid item xs={1} container alignItems={'center'} justify={'center'}>
        <LikeButton itemType={'comment'} mode={'unhelpful'} likeItem={comment} dislikes={cmtUnHelpfuls}/>
      </Grid>
      <Grid item xs={1}>
        <EditButton editItem={comment} itemType={'comment'}/>
      </Grid>
      <Grid item xs={1}>
        <DeleteButton deleteItem={comment} itemType={'comment'}/>
      </Grid>
      {attachments && attachments.length > 0 && (
        <Container>
          <Grid item>
            {attachments.map((attachment, index) => (
              <DownloadLinkItem key={String(index)} attachment={attachment}/>
            ))}
          </Grid>
        </Container>
      )}
    </Grid>
  );
};

export default CommentItem;
