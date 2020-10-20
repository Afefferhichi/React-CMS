import React, {createRef, useContext} from "react";
import {MuiAlert, Snackbar} from "project-elements";
import {MainContext} from "../../contexts/MainContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBar = props => {
  const {snackbar = {}, closeSnackBar, dispatch} = useContext(MainContext);
  const snackbarRef = createRef();

  const {message = '', severity = 'success', opened = false} = snackbar;

  return (
    <Snackbar
      ref={snackbarRef}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={opened}
      autoHideDuration={5000}
      onClose={() => closeSnackBar(dispatch)}
    >
      <Alert
        style={{minWidth: 300}}
        severity={severity}
        onClose={() => closeSnackBar(dispatch)}>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default SnackBar;
