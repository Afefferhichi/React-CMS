import React from "react";
import {Container} from "project-elements";
import PostsAddNew from "../../../components/PostsList/PostsAddNew";
import PostsList from "../../../components/PostsList";

const UserHome = props => {
  return (
    <Container maxWidth='md'>
      <PostsAddNew/>
      <PostsList/>
    </Container>
  );
};

export default UserHome;