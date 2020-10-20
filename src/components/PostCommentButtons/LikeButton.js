import React, {useContext, useState} from "react";
import {CircularProgress, IconButton, ThumbUpIcon, Typography} from "project-elements";
import {MainContext} from "../../contexts/MainContext";

const LikeButton = props => {
  const {likes, dislikes, mode, likeItem, itemType, readOnly} = props;
  const [onProcessing, setOnProcessing] = useState('');
  const {likePost, helpfulComment, openSnackBar, dispatch} = useContext(MainContext);

  const likePostPressHandler = async () => {
    try{
      setOnProcessing(mode);
      if (itemType === 'post') {
        await likePost({post_id: likeItem._id, like: mode === 'like'}, dispatch);
      }
      if (itemType === 'comment') {
        await helpfulComment({comment_id: likeItem._id, post_id: likeItem.postId, helpful: mode === 'helpful'}, dispatch);
      }
      setOnProcessing('');
      openSnackBar({message: 'Success!', severity: 'success'}, dispatch);
    } catch (errorResponse) {
      setOnProcessing('');
      let message;
      if(errorResponse.error) {
        message = errorResponse.error.message
      } else {
        message = 'Unexpected error occurred'
      }
      openSnackBar({message, severity: 'error'}, dispatch);
    }
  };

  return (
    <>
      <Typography>
        {(mode === 'like' || mode === 'helpful') && likes && likes.length}
        {(mode === 'dislike' || mode === 'unhelpful') && dislikes && dislikes.length}
      </Typography>
      <IconButton disabled={readOnly === true || onProcessing === mode}
                  onClick={readOnly === false ? likePostPressHandler : undefined}>
        {onProcessing === mode ? <CircularProgress size={'1.2rem'}/> : <ThumbUpIcon/>}
      </IconButton>
    </>
  );
};

export default LikeButton;