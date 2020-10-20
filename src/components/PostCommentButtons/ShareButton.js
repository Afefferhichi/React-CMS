import React, {useContext} from "react";
import {IconButton, ShareIcon} from "../../themes/mui/Elements";
import {MainContext} from "../../contexts/MainContext";

const ShareButton = props => {
  const {openSnackBar, dispatch} = useContext(MainContext);

  const {url} = props;

  const sharePressHandler = () => {
    navigator.clipboard.writeText(url);
    openSnackBar({message: 'Copied to clipboard'}, dispatch)
  };

  return (
    <IconButton onClick={sharePressHandler}>
      <ShareIcon/>
    </IconButton>
  );
}

export default ShareButton;