import React from "react";
import PostItem from "./PostItem";

const PostsList = props => {
  const {posts} = props;
  return (
    <>
      {posts && posts.length > 0 && posts.map((post, index) => (
        <PostItem key={String(index)} post={post}/>
      ))}
    </>
  );
};

export default PostsList;