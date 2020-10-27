import React, {useContext} from "react";
import {IconButton, ShareIcon} from "../../themes/mui/Elements";
import {dispatch2, MainContext} from "../../contexts/MainContext";

const ShareButton = props => {
  const {openSnackBar} = useContext(MainContext);

  const {url} = props;

  const sharePressHandler = () => {
    navigator.clipboard.writeText(url);
    openSnackBar({message: 'Copied to clipboard'}, dispatch2)
  };

  return (
    <IconButton onClick={sharePressHandler}>
      <ShareIcon/>
    </IconButton>
  );
}

export default ShareButton;