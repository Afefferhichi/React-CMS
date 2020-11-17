import React from 'react';
import Container from '@material-ui/core/Container';
import PostsList from "../../../components/PostsList";

export default () => {
  return (
    <Container maxWidth='md'>
      <PostsList listType={'byAdmin'}/>
    </Container>
  );
}
