import React, {useContext, useState} from "react";
import {
  Avatar,
  CircularProgress,
  Container,
  DeleteIcon,
  EditIcon,
  Grid,
  IconButton,
  ThumbDownIcon,
  ThumbUpIcon,
  Typography
} from "project-elements";
import useCommentItemStyle from './CommentItem.style';
import {MainContext} from "../../../contexts/MainContext";
import CommentForm from "../CommentForm";
import DownloadLinkItem from "../../DownloadLinkItem";
import constants from "../../../config/constants";

const CommentItem = props => {
  const {openDialog, closeDialog, deleteComment, updateComment, helpfulComment, dispatch} = useContext(MainContext);
  const [processing, setProcessing] = useState('');
  const classes = useCommentItemStyle();
  const {comment, post_id} = props;
  const {
    _id,
    avatar = 'U',
    cmtValue = 'Comment',
    cmtHelpfuls,
    cmtUnHelpfuls,
    attachments,
    author
  } = comment;

  const pressDeleteCommentHandler = async () => {
    // setProcessing('delete');
    await deleteComment({id: _id, post_id}, dispatch);
    // setProcessing('');
  };
  const pressHelpfulHandler = async () => {
    setProcessing('helpful');
    await helpfulComment({post_id, comment_id: _id, helpful: true}, dispatch);
    setProcessing('');
  };
  const pressUnHelpfulHandler = async () => {
    setProcessing('unhelpful');
    await helpfulComment({post_id, comment_id: _id, helpful: false}, dispatch);
    setProcessing('');
  };
  const pressEditHandler = () => {
    openDialog({
      title: 'Comment',
      contentComponent: <CommentForm useInDialog={true} comment={comment} onSave={updateCommentHandler}/>
    }, dispatch);
  };
  const updateCommentHandler = async (comment) => {
    await updateComment({post_id, comment_id: _id, comment}, dispatch).then(() => {
      closeDialog(dispatch);
    })
  };

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
        <Typography>{cmtHelpfuls.length}</Typography>
        <IconButton disabled={processing === 'helpful'} onClick={pressHelpfulHandler}>
          {processing === 'helpful' ? <CircularProgress size={'1.2rem'}/> : <ThumbUpIcon/>}
        </IconButton>
      </Grid>
      <Grid item xs={1} container alignItems={'center'} justify={'center'}>
        <Typography>{cmtUnHelpfuls.length}</Typography>
        <IconButton disabled={processing === 'unhelpful'} onClick={pressUnHelpfulHandler}>
          {processing === 'unhelpful' ? <CircularProgress size={'1.2rem'}/> : <ThumbDownIcon/>}
        </IconButton>
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={pressEditHandler}>
          <EditIcon/>
        </IconButton>
      </Grid>
      <Grid item xs={1}>
        <IconButton disabled={processing === 'delete'} color='secondary' onClick={pressDeleteCommentHandler}>
          {processing === 'delete' ? <CircularProgress size={'1.2rem'}/> : <DeleteIcon/>}
        </IconButton>
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
