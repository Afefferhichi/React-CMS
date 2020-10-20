import {OPEN_CLOSE_SNACKBAR} from "../reducers/SnackbarReducer";

const openSnackBar = async (snackbarData, dispatch) => {
  const {message, severity} = snackbarData;
  try {
    dispatch({type: OPEN_CLOSE_SNACKBAR, payload: {opened: true, message, severity}});
  } catch (err) {
    throw err;
  }
};

const closeSnackBar = async (dispatch) => {
  try {
    dispatch({type: OPEN_CLOSE_SNACKBAR, payload: {opened: false}});
  } catch (err) {
    throw err;
  }
};

export default {
  openSnackBar,
  closeSnackBar
};
