import {OPEN_CLOSE_SNACKBAR} from "../reducers/SnackbarReducer";
import {dispatch2} from "../MainContext";

const openSnackBar = async (snackbarData) => {
  const {message, severity, duration, buttons} = snackbarData;
  try {
    dispatch2({type: OPEN_CLOSE_SNACKBAR, payload: {opened: true, message, severity, duration, buttons}});
  } catch (err) {
    throw err;
  }
};

const closeSnackBar = async () => {
  try {
    dispatch2({type: OPEN_CLOSE_SNACKBAR, payload: {opened: false}});
  } catch (err) {
    throw err;
  }
};

export default {
  openSnackBar,
  closeSnackBar
};
