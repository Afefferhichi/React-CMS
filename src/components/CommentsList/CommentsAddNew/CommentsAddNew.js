import React, {useContext} from "react";
import CommentForm from "../CommentForm";
import {dispatch2, MainContext} from "../../../contexts/MainContext";

const CommentsAddNew = props => {
  const {addComment, openSnackBar} = useContext(MainContext);
  const {post_id} = props;

  const addCommentHandler = async (formData) => {
    await addComment({post_id, comment: formData}, dispatch2);
    openSnackBar({message: 'Successfully created!', severity: 'success'}, dispatch2);
  };

  return (
    <CommentForm onSave={addCommentHandler} post_id={post_id}/>
  );
};

export default CommentsAddNew;