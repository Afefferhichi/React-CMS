import React, {useContext, useEffect, useState} from 'react';
import {MainContext} from '../../contexts/MainContext';
import {CircularProgress, Container} from 'project-elements';
import PostItem from "../../components/PostsList/PostItem";

const ShowPost = (props) => {
  const {client, post, getPost, dispatch} = useContext(MainContext);
  const [loading, setLoading] = useState(true);
  const post_id = props.match.params.id;
  const componentDidMount = () => {
    getPost(post_id, dispatch).then(() => {
      setLoading(false);
    })
  };
  useEffect(componentDidMount, []);
  return (client ? (
    <Container maxWidth='md'>
      {loading
        ? (
          <CircularProgress size={'1.5rem'} style={{marginTop: 100}}/>
        ) : (
          post ? <PostItem post={post}/> : 'There is no such a post'
        )}
    </Container>
  ) : null);
};

export default ShowPost;