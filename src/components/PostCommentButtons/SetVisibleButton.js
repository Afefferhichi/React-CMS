import React, {useContext, useState} from "react";
import {IconButton, VisibilityIcon, VisibilityOffIcon} from "project-elements";
import {MainContext} from "../../contexts/MainContext";

const SetVisibleButton = props => {
  const {setVisiblePost, setVisibleComment, dispatch} = useContext(MainContext);
  const [onProcessing, setOnProcessing] = useState('');
  const {visibleItem, itemType} = props;
  const visibleItemPressHandler = async () => {
    try{
      setOnProcessing('visible');
      const visibleMethod = visibleItem.visible ? 'invisible' : 'visible';
      if (itemType === 'post') {
        await setVisiblePost(visibleItem._id, visibleMethod, dispatch);
      }
      if (itemType === 'comment') {
        await setVisibleComment(visibleItem._id, visibleMethod, dispatch);
      }
      setOnProcessing('');
    } catch (errorResponse) {
      setOnProcessing('');
      if(errorResponse.error) {
        alert(errorResponse.error.message)
      } else {
        alert('Unexpected error occurred')
      }
    }
  };
  return (
    <IconButton disabled={onProcessing === 'visible'} onClick={visibleItemPressHandler}>
      {visibleItem.visible === true && <VisibilityIcon/>}
      {visibleItem.visible === false && <VisibilityOffIcon/>}
    </IconButton>
  );
};

export default SetVisibleButton;