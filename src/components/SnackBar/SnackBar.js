import React, {createRef, useContext} from "react";
import {IconButton, Snackbar} from "@material-ui/core";
import {CloseIcon} from "../../themes/mui/Elements";
import {MainContext} from "../../contexts/MainContext";

const SnackBar = props => {
  const {snackbar, closeSnackBar, dispatch} = useContext(MainContext);
  const snackbarRef = createRef();

  return (
    (snackbar && snackbar.opened === true)
      ? (
        <Snackbar
          ref={snackbarRef}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={snackbar.opened}
          autoHideDuration={5000}
          onClose={()=>closeSnackBar(dispatch)}
          message={snackbar.message || 'Snack bar opening...'}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={()=>closeSnackBar(dispatch)}>
              <CloseIcon fontSize="small"/>
            </IconButton>
          }
        />)
      : null
  );
};
export default SnackBar;
