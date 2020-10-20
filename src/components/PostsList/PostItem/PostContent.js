import React, {useContext} from "react";
import {Link} from 'react-router-dom';
import {ArrowBack, Avatar, Divider, Grid, Typography} from "project-elements";
import usePostContentStyle from './PostContent.style';
import {MainContext} from "../../../contexts/MainContext";
import DownloadLinkItem from "../../DownloadLinkItem";
import constants from "../../../config/constants";
import ShareButton from "../../PostCommentButtons/ShareButton";
import LikeButton from "../../PostCommentButtons/LikeButton";
import EditButton from "../../PostCommentButtons/EditButton";
import DeleteButton from "../../PostCommentButtons/DeleteButton";

const PostContent = props => {
  const classes = usePostContentStyle();
  const {client} = useContext(MainContext);

  const {post} = props;
  const isAdmin = client.role === 'admin';
  const isAuthor = client.role === 'user' && post.author._id === client._id;
  const isReader = !isAdmin && !isAuthor;
  const {
    _id,
    pstTitle,
    pstContent,
    pstLikes,
    pstDislikes,
    attachments,
    author,
    url = window.location.origin + '/posts/' + _id,
  } = post;
  const hasPostIdInUrl = window.location.href.indexOf(_id) > -1;

  return (
    <>
      {/*<Grid item xs={12}>*/}
      {/*  <Typography>isAdmin: {String(isAdmin)}</Typography>*/}
      {/*  <Typography>isAuthor: {String(isAuthor)}</Typography>*/}
      {/*  <Typography>isReader: {String(isReader)}</Typography>*/}
      {/*</Grid>*/}
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
            <ShareButton url={url}/>
          </Grid>
          <Grid item xs={3} container alignItems={'center'} justify={'center'}
                className={classes.linkButtonContainer}>
            <LikeButton itemType={'post'} mode={'like'} likeItem={post} likes={pstLikes}/>
          </Grid>
          <Grid item xs={3} container alignItems={'center'} justify={'center'}>
            <LikeButton itemType={'post'} mode={'dislike'} likeItem={post} dislikes={pstDislikes}/>
          </Grid>
          <Grid item xs={2} container alignItems={'center'} justify={'center'}>
            <EditButton editItem={post} itemType={'post'}/>
          </Grid>
          <Grid item xs={2} container alignItems={'center'} justify={'center'}>
            <DeleteButton deleteItem={post} itemType={'post'}/>
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
          <DownloadLinkItem key={String(index)} attachment={attachment}/>
        ))}
      </Grid>
    </>
  );
};

export default PostContent;