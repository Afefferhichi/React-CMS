import React, {useContext} from "react";
import usePostAddNewStyle from './PostsAddNew.style'
import PostForm from "../../PostForm";
import {MainContext} from "../../../contexts/MainContext";
import {Button} from "@material-ui/core";

const PostAddNew = props => {
  const classes = usePostAddNewStyle();
  const {openDialog, closeDialog, addPost, openSnackBar, dispatch} = useContext(MainContext);
  const {webpage_id} = props;
  const handleClickOpen = () => {
    openDialog({title: 'Post', contentComponent: <PostForm refresh={+new Date()} onSave={addPostHandler}/>}, dispatch);
  };
  const addPostHandler = async (postData) => {
    // console.log('postData', postData);
    await addPost(postData, webpage_id);
    await closeDialog(dispatch);
    openSnackBar({message: 'Successfully created', severity: 'success'}, dispatch);
  };
  return (
    <>
      <Button
        variant='outlined' color='primary' className={classes.add}
        onClick={handleClickOpen}>Add Post</Button>
      {/*<PostForm onSave={addPostHandler}/>*/}
    </>
  );
};

export default PostAddNew;
