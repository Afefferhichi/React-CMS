import React, {useContext} from "react";
import CommentForm from "../CommentForm";
import {MainContext} from "../../../contexts/MainContext";

const CommentsAddNew = props => {
  const {addComment, dispatch} = useContext(MainContext);
  const {post_id} = props;

  const addCommentHandler = async (formData) => {
    await addComment({post_id, comment: formData}, dispatch);
  };

  return (
    <CommentForm onSave={addCommentHandler} post_id={post_id}/>
  );
};

export default CommentsAddNew;