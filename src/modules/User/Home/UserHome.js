import React from "react";
import {Container} from "project-elements";
import PostsList from "../../../components/PostsList";

const UserHome = props => {
  return (
    <Container maxWidth='md'>
      <PostsList listType={'inHome'}/>
    </Container>
  );
};

export default UserHome;
