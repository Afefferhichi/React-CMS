import React, {useContext, useEffect, useState} from "react";
import {DeleteIcon, IconButton} from "../../themes/mui/Elements";
import {MainContext} from "../../contexts/MainContext";

const DeleteButton = props => {
  const [onProcessing, setOnProcessing] = useState('');
  const {deletePost, deleteComment, openSnackBar, dispatch} = useContext(MainContext);

  const {deleteItem, itemType} = props;

  const hasItemIdInUrl = window.location.href.indexOf(deleteItem._id) > -1;

  const deleteItemPressHandler = async () => {
    if (!window.confirm('Are you sure to delete?')) return;
    try {
      if (itemType === 'post') {
        await deletePost(deleteItem._id, dispatch);
      }
      if (itemType === 'comment') {
        await deleteComment({id: deleteItem._id, post_id: deleteItem.postId}, dispatch);
      }
      // if(!willUnmount) setOnProcessing('');
      if (hasItemIdInUrl) {
        window.history.back();
      }
      openSnackBar({message: 'Successfully deleted', severity: 'success'}, dispatch);
    } catch (errorResponse) {
      let message;
      if (errorResponse.error) {
        message = errorResponse.error.message;
      } else {
        message = 'Unexpected error occurred';
      }
      openSnackBar({message, severity: 'error'}, dispatch);
    }
  };

  const componentDidMount = () => {
    return () => {
      setOnProcessing('');
    }
  };
  useEffect(componentDidMount, []);
  return (
    <IconButton disabled={onProcessing === 'delete'} color='secondary' onClick={deleteItemPressHandler}>
      <DeleteIcon/>
    </IconButton>
  );
}

export default DeleteButton;