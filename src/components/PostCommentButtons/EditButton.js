import React, {useContext} from "react";
import {EditIcon, IconButton} from "../../themes/mui/Elements";
import PostForm from "../PostForm";
import {MainContext} from "../../contexts/MainContext";
import CommentForm from "../CommentsList/CommentForm";

const EditButton = props => {
  const {closeDialog, openDialog, updatePost, updateComment, dispatch} = useContext(MainContext);
  const {editItem, itemType} = props;

  const EditForm = itemType === 'post' ? PostForm : CommentForm;
  const FormTitle = itemType === 'post' ? 'Edit post' : 'Edit comment';


  const updateItemHandler = (itemData) => {
    if(itemType === 'post') {
      updatePost(editItem._id, itemData, dispatch).then(() => {
        closeDialog(dispatch);
      });
    }
    if(itemType === 'comment') {
      updateComment({post_id: editItem.postId, comment_id: editItem._id, comment: itemData}, dispatch).then(() => {
        closeDialog(dispatch);
      });
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