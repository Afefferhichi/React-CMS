import React, {useContext, useEffect, useState} from 'react';
import {MainContext} from '../../contexts/MainContext';
import {CircularProgress, Container, Grid} from 'project-elements';
import PostItem from "../../components/PostsList/PostItem";
import useShowPostStyles from './ShowPost.style';

const ShowPost = (props) => {
  const classes = useShowPostStyles();
  const {client, post, getPost, dispatch} = useContext(MainContext);
  const [loading, setLoading] = useState(true);
  const post_id = props.match.params.id;
  const componentDidMount = () => {
    getPost(post_id, dispatch).then(() => {
      setLoading(false);
    })
  };
  useEffect(componentDidMount, []);
  return ((client && client.role === 'user') ? (
    <Container maxWidth='md'>
      <Grid container justify={'center'} alignItems={'center'} className={classes.grid} spacing={3}>
        {loading
          ? (
            <CircularProgress size={'1.5rem'} style={{marginTop: 100}}/>
          ) : (
            post ? <PostItem post={post}/> : 'There is no such a post'
          )}
      </Grid>
    </Container>
  ) : null);
};

export default ShowPost;