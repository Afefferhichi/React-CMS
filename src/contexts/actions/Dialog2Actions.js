import {OPEN_CLOSE_DIALOG2} from "../reducers/Dialog2Reducer";

const openDialog = async (Dialog2Data, dispatch) => {
  const {title, contentComponent} = Dialog2Data;
  try {
    dispatch({type: OPEN_CLOSE_DIALOG2, payload: {title, opened: true, contentComponent}});
  } catch (err) {
    throw err;
  }
};

const closeDialog = async (dispatch) => {
  try {
    dispatch({type: OPEN_CLOSE_DIALOG2, payload: {opened: false}});
  } catch (err) {
    throw err;
  }
};

export default {
  openDialog,
  closeDialog
};
