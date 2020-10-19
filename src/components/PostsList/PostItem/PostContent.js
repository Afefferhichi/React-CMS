import React, {useContext, useState} from "react";
import {Link} from 'react-router-dom';
import {
  ArrowBack,
  Avatar,
  CircularProgress,
  DeleteIcon,
  Divider,
  EditIcon,
  Grid,
  IconButton,
  ShareIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  Typography
} from "project-elements";
import usePostContentStyle from './PostContent.style';
import {MainContext} from "../../../contexts/MainContext";
import PostForm from "../PostForm";
import DownloadLinkItem from "../../DownloadLinkItem";
import constants from "../../../config/constants";

const PostContent = props => {
  const classes = usePostContentStyle();
  const {closeDialog, openDialog, deletePost, updatePost, likePost, openSnackBar, dispatch} = useContext(MainContext);
  const [onProcessing, setOnProcessing] = useState('');
  const {post} = props;
  const {
    _id,
    avatar = 'U',
    pstTitle,
    pstContent,
    pstLikes,
    pstDislikes,
    attachments,
    author,
    url = window.location.origin + '/posts/' + _id,
  } = post;
  const hasPostIdInUrl = window.location.href.indexOf(_id) > -1;

  const deletePostPressHandler = async () => {
    // setOnProcessing('delete');
    await deletePost(_id, dispatch);
    if (hasPostIdInUrl) {
      window.history.back();
    }
  };

  const updatePostHandler = (postData) => {
    updatePost(_id, postData, dispatch).then(() => {
      closeDialog(dispatch);
    });
  };

  const editPostPressHandler = () => {
    openDialog({title: 'Post', contentComponent: <PostForm post={post} refresh={+new Date()} onSave={updatePostHandler}/>}, dispatch);
  };

  const likePostPressHandler = async () => {
    setOnProcessing('like');
    await likePost({post_id: _id, like: true}, dispatch);
    setOnProcessing('');
  };

  const dislikePostPressHandler = async () => {
    setOnProcessing('dislike');
    await likePost({post_id: _id, like: false}, dispatch);
    setOnProcessing('');
  };

  const sharePressHandler = () => {
    navigator.clipboard.writeText(url);
    openSnackBar({message: 'Copied to clipboard'}, dispatch)
  };

  return (
    <>
      <Grid item xs={8}>
        <Grid container className={classes.grid} spacing={0} alignItems='center'>
          {hasPostIdInUrl && (
            <Grid item xs={1} container justify={'center'} alignItems={'center'}>
              <Link to={'/home'}>
                <ArrowBack/>
              </Link>
            </Grid>
          )}
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
          <Grid item xs={hasPostIdInUrl ? 10 : 11}>
            {!hasPostIdInUrl
              ? (
                <Link to={'/posts/' + _id}>
                  <Typography variant='h6'>
                    {pstTitle}
                  </Typography>
                </Link>
              )
              : (
                <Typography variant='h6'>
                  {pstTitle}
                </Typography>
              )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container className={classes.grid} spacing={2}>
          <Grid item xs={2} container alignItems={'center'} justify={'center'}>
            <IconButton onClick={sharePressHandler}>
              <ShareIcon/>
            </IconButton>
          </Grid>
          <Grid item xs={3} container alignItems={'center'} justify={'center'}
                className={classes.linkButtonContainer}>
            <Typography>
              {pstLikes && pstLikes.length}
            </Typography>
            <IconButton disabled={onProcessing === 'like'} onClick={likePostPressHandler}>
              {onProcessing === 'like' ? <CircularProgress size={'1.2rem'}/> : <ThumbUpIcon/>}
            </IconButton>
          </Grid>
          <Grid item xs={3} container alignItems={'center'} justify={'center'}>
            <Typography>
              {pstDislikes && pstDislikes.length}
            </Typography>
            <IconButton disabled={onProcessing === 'dislike'} onClick={dislikePostPressHandler}>
              {onProcessing === 'dislike' ? <CircularProgress size={'1.2rem'}/> : <ThumbDownIcon/>}
            </IconButton>
          </Grid>
          <Grid item xs={2} container alignItems={'center'} justify={'center'}>
            <IconButton onClick={editPostPressHandler}>
              <EditIcon/>
            </IconButton>
          </Grid>
          <Grid item xs={2} container alignItems={'center'} justify={'center'}>
            <IconButton disabled={onProcessing === 'delete'} color='secondary' onClick={deletePostPressHandler}>
              <DeleteIcon/>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div dangerouslySetInnerHTML={{__html: pstContent}}/>
      </Grid>
      <Grid item xs={12}>
        <Divider/>
      </Grid>
      <Grid item>
        {attachments.map((attachment, index) => (
          <DownloadLinkItem key={String(index)} attachment={attachment} />
        ))}
      </Grid>
    </>
  );
};

export default PostContent;