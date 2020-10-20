import React, {useContext} from "react";
import {EditIcon, IconButton} from "../../themes/mui/Elements";
import PostForm from "../PostForm";
import {MainContext} from "../../contexts/MainContext";
import CommentForm from "../CommentsList/CommentForm";

const EditButton = props => {
  const {closeDialog, openDialog, updatePost, updateComment, openSnackBar, dispatch} = useContext(MainContext);
  const {editItem, itemType} = props;

  const EditForm = itemType === 'post' ? PostForm : CommentForm;
  const FormTitle = itemType === 'post' ? 'Edit post' : 'Edit comment';


  const updateItemHandler = async (itemData) => {
    try {
      if (itemType === 'post') {
        await updatePost(editItem._id, itemData, dispatch);
      }
      if (itemType === 'comment') {
        await updateComment({post_id: editItem.postId, comment_id: editItem._id, comment: itemData}, dispatch);
      }
      openSnackBar({message: 'Successfully updated!', severity: 'success'}, dispatch);
      closeDialog(dispatch);
    } catch (errorResponse) {
      let message;
      if (errorResponse.error) {
        message = (errorResponse.error.message)
      } else {
        message = ('Unexpected error occurred')
      }
      openSnackBar({message, severity: 'error'}, dispatch);
      closeDialog(dispatch);
    }
  };

  const editItemPressHandler = () => {
    openDialog({
      title: FormTitle,
      contentComponent: <EditForm itemData={editItem} refresh={+new Date()} onSave={updateItemHandler}/>
    }, dispatch);
  };

  return (
    <IconButton onClick={editItemPressHandler}>
      <EditIcon/>
    </IconButton>
  );
}

export default EditButton;