import {
  ADD_WEBPAGE,
  DELETE_WEBPAGE,
  DISABLE_WEBPAGE,
  ENABLE_WEBPAGE,
  FOLLOW_WEBPAGE,
  LOAD_WEBPAGE,
  LOAD_WEBPAGES,
  UNFOLLOW_WEBPAGE,
  UPDATE_WEBPAGE
} from "../reducers/WebPageReducer";
import CallServer from "../../utils/CallServer";
import {dispatch2} from "../MainContext";

const loadWebPages = async () => {
  try {
    const request = await CallServer.get('webpages');
    const {webpages} = request;
    await dispatch2({type: LOAD_WEBPAGES, payload: webpages});
  } catch (err) {
    throw err;
  }
}

const loadWebPage = async (webpage_id) => {
  try {
    const request = await CallServer.get('webpages/' + webpage_id);
    const {webpage} = request;
    await dispatch2({type: LOAD_WEBPAGE, payload: webpage});
  } catch (err) {
    throw err;
  }
}

const followWebPage = async (webpage_id, followMethod) => {
  try {
    const request = await CallServer.get('webpages/' + webpage_id + '/' + followMethod);
    const {success, followers} = request;
    if (success === true) {
      await dispatch2({type: followMethod === 'follow' ? FOLLOW_WEBPAGE : UNFOLLOW_WEBPAGE, payload: followers});
    } else {
      throw request;
    }
  } catch (err) {
    throw err;
  }
}

const addWebPage = async (webpageData) => {
  try {
    const request = await CallServer.post('webpages', webpageData);
    const {createdWebPage} = request;
    await dispatch2({type: ADD_WEBPAGE, payload: createdWebPage});
  } catch (err) {
    throw err;
  }
}

const setEnabledWebPage = async ({id, enabled}) => {
  try {
    const enableMethod = enabled ? 'enable' : 'disable';
    const request = await CallServer.get('webpages/' + id + '/' + enableMethod)
    const {updatedWebPage} = request;
    dispatch2({type: enabled ? ENABLE_WEBPAGE : DISABLE_WEBPAGE, payload: updatedWebPage._id});
  } catch (err) {
    throw err;
  }
}

const updateWebPage = async ({id, webpageData}) => {
  try {
    const request = await CallServer.put('webpages/' + id, webpageData);
    const {updatedWebPage} = request;
    dispatch2({type: UPDATE_WEBPAGE, payload: updatedWebPage});
  } catch (err) {
    throw err;
  }
}

const deleteWebPage = async (id) => {
  try {
    const request = await CallServer.delete('webpages/' + id);
    const {deletedWebPage, success} = request;
    if (success === true)
      dispatch2({type: DELETE_WEBPAGE, payload: deletedWebPage._id});
    else
      throw request;
  } catch (err) {
    throw err;
  }
};

export default {
  loadWebPages,
  loadWebPage,
  followWebPage,
  addWebPage,
  setEnabledWebPage,
  updateWebPage,
  deleteWebPage,
};
