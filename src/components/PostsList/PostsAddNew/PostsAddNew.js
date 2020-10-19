import React, {useContext} from "react";
import usePostAddNewStyle from './PostsAddNew.style'
import PostForm from "../PostForm";
import {MainContext} from "../../../contexts/MainContext";
import {Button} from "@material-ui/core";

const PostAddNew = props => {
  const classes = usePostAddNewStyle();
  const {openDialog, closeDialog, addPost, dispatch} = useContext(MainContext);
  const handleClickOpen = () => {
    openDialog({title: 'Post', contentComponent: <PostForm refresh={+new Date()} onSave={addPostHandler}/>}, dispatch);
  };
  const addPostHandler = async (postData) => {
    // console.log('postData', postData);
    await addPost(postData, dispatch);
    await closeDialog(dispatch);
  };
  return (
    <>
      <Button
        fullWidth variant='outlined' color='primary' className={classes.add}
        onClick={handleClickOpen}>Add Post</Button>
      {/*<PostForm onSave={addPostHandler}/>*/}
    </>
  );
};

export default PostAddNew;