import {OPEN_CLOSE_DIALOG2} from "../reducers/Dialog2Reducer";
import {dispatch2} from "../MainContext";

const openDialog = async (Dialog2Data) => {
  const {title, contentComponent} = Dialog2Data;
  try {
    dispatch2({type: OPEN_CLOSE_DIALOG2, payload: {title, opened: true, contentComponent}});
  } catch (err) {
    throw err;
  }
};

const closeDialog = async () => {
  try {
    dispatch2({type: OPEN_CLOSE_DIALOG2, payload: {opened: false}});
  } catch (err) {
    throw err;
  }
};

export default {
  openDialog,
  closeDialog
};
