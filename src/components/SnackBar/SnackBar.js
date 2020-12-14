import React, {createRef, useContext} from "react";
import {Button, MuiAlert, Snackbar} from "project-elements";
import {MainContext} from "../../contexts/MainContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBar = props => {
  const {snackbar = {}, closeSnackBar, dispatch} = useContext(MainContext);
  const snackbarRef = createRef();

  const {message = '', severity = 'success', opened = false, duration = 2000, buttons = []} = snackbar;

  return (
    <Snackbar
      ref={snackbarRef}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      id={'snackBar'}
      severity={severity}
      open={opened}
      autoHideDuration={duration}
      onClose={() => closeSnackBar(dispatch)}
    >
      <Alert
        style={{minWidth: 300}}
        severity={severity}
        onClose={() => closeSnackBar(dispatch)}>
        {message}
        {buttons && buttons.map(button => (
          <Button variant={'outlined'} size={'small'} onClick={button.onClick}>{button.text}</Button>
        ))}
      </Alert>
    </Snackbar>
  );
};
export default SnackBar;
