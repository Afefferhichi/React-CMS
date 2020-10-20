import React, {useContext} from "react";
import {Avatar, Container, Grid, Typography} from "project-elements";
import useCommentItemStyle from './CommentItem.style';
import DownloadLinkItem from "../../DownloadLinkItem";
import constants from "../../../config/constants";
import EditButton from "../../PostCommentButtons/EditButton";
import DeleteButton from "../../PostCommentButtons/DeleteButton";
import LikeButton from "../../PostCommentButtons/LikeButton";
import {MainContext} from "../../../contexts/MainContext";
import SetVisibleButton from "../../PostCommentButtons/SetVisibleButton";

const CommentItem = props => {
  const {client} = useContext(MainContext);

  const classes = useCommentItemStyle();
  const {comment} = props;

  const {
    cmtValue = 'Comment',
    cmtHelpfuls,
    cmtUnHelpfuls,
    attachments,
    author
  } = comment;

  const isAdmin = client.role === 'admin';
  const isAuthor = client.role === 'user' && comment.author._id === client._id;
  const isReader = !isAdmin && !isAuthor;

  return (
    <Grid container className={classes.container} spacing={1}>
      <Grid item xs={1}>
        <Avatar title={`${author.firstname} ${author.lastname} ${author.email}`}>
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
      <Grid item xs={7} style={{paddingTop: 10,}}>
        <Typography>{cmtValue}</Typography>
      </Grid>
      <Grid item xs={4} style={{paddingRight: 20}}>
        <Grid container justify={'flex-end'}>
          {isReader && (
            <Grid item container alignItems={'center'} justify={'center'}
                  style={{width: 75, float: 'left'}}
                  className={classes.linkButtonContainer}>
              <LikeButton itemType={'comment'} mode={'helpful'} likeItem={comment} likes={cmtHelpfuls}/>
            </Grid>
          )}
          {isReader && (
            <Grid item container alignItems={'center'} justify={'center'}
                  style={{width: 75, float: 'left'}}
                  className={classes.linkButtonContainer}>
              <LikeButton itemType={'comment'} mode={'unhelpful'} likeItem={comment} dislikes={cmtUnHelpfuls}/>
            </Grid>
          )}
          {isAuthor && (
            <Grid item container alignItems={'center'} justify={'center'}
                  style={{width: 50, float: 'left'}} >
              <EditButton editItem={comment} itemType={'comment'}/>
            </Grid>
          )}
          {isAuthor && (
            <Grid item container alignItems={'center'} justify={'center'}
                  style={{width: 50, float: 'left'}} >
              <DeleteButton deleteItem={comment} itemType={'comment'}/>
            </Grid>
          )}
          {isAdmin && (
            <Grid item container alignItems={'center'} justify={'center'}
                  style={{width: 50, float: 'left'}} >
              <SetVisibleButton visibleItem={comment} itemType={'comment'}/>
            </Grid>
          )}
        </Grid>
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
