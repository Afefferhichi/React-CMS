import {
  ADD_WEBPAGE,
  DELETE_WEBPAGE,
  DISABLE_WEBPAGE,
  ENABLE_WEBPAGE,
  LOAD_WEBPAGES,
  UPDATE_WEBPAGE
} from "../reducers/WebPageReducer";
import CallServer from "../../utils/CallServer";

const loadWebPages = async (dispatch) => {
  try {
    const request = await CallServer.get('webpages');
    const {webpages} = request;
    await dispatch({type: LOAD_WEBPAGES, payload: webpages});
  } catch (err) {
    throw err;
  }
}

const addWebPage = async (webpageData, dispatch) => {
  try {
    const request = await CallServer.post('webpages', webpageData);
    const {createdWebPage} = request;
    await dispatch({type: ADD_WEBPAGE, payload: createdWebPage});
  } catch (err) {
    throw err;
  }
}

const setEnabledWebPage = async ({id, enabled}, dispatch) => {
  try {
    const enableMethod = enabled ? 'enable' : 'disable';
    const request = await CallServer.get('webpages/' + id + '/' + enableMethod)
    const {updatedWebPage} = request;
    dispatch({type: enabled ? ENABLE_WEBPAGE : DISABLE_WEBPAGE, payload: updatedWebPage._id});
  } catch (err) {
    throw err;
  }
}

const updateWebPage = async ({id, webpageData}, dispatch) => {
  try {
    const request = await CallServer.put('webpages/' + id, webpageData);
    const {updatedWebPage} = request;
    dispatch({type: UPDATE_WEBPAGE, payload: updatedWebPage});
  } catch (err) {
    throw err;
  }
}

const deleteWebPage = async (id, dispatch) => {
  try {
    const request = await CallServer.delete('webpages/' + id);
    const {deletedWebPage} = request;
    dispatch({type: DELETE_WEBPAGE, payload: deletedWebPage._id});
  } catch (err) {
    throw err;
  }
};

export default {
  loadWebPages,
  addWebPage,
  setEnabledWebPage,
  updateWebPage,
  deleteWebPage,
};
