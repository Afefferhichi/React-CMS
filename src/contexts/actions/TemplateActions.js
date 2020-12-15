import {
  ADD_TEMPLATE,
  DELETE_TEMPLATE,
  DISABLE_TEMPLATE,
  ENABLE_TEMPLATE,
  LOAD_TEMPLATES, SELECT_TEMPLATE_CATEGORIES,
  UPDATE_TEMPLATE
} from "../reducers/TemplateReducer";
import CallServer from "../../utils/CallServer";
import {dispatch2} from "../MainContext";

const loadTemplates = async ({categories}) => {
  try {
    const categories_query = ((categories && categories.map(category => category.text)) || []).join(',')
    const request = await CallServer.get('templates?categories='+encodeURI(categories_query));
    const {templates} = request;
    await dispatch2({type: LOAD_TEMPLATES, payload: templates});
  } catch (err) {
    throw err;
  }
}

const loadTemplateCategories = async () => {
  try {
    const request = await CallServer.get('templates/categories');
    const {template_categories} = request;
    return template_categories;
  } catch (err) {
    throw err;
  }
}

const selectTemplateCategories = async (selected_template_categories) => {
  try {
    await dispatch2({type: SELECT_TEMPLATE_CATEGORIES, payload: selected_template_categories});
  } catch (err) {
    throw err;
  }
}

const addTemplate = async (templateData, dispatch) => {
  try {
    const request = await CallServer.post('templates', templateData);
    const {createdTemplate} = request;
    await dispatch({type: ADD_TEMPLATE, payload: createdTemplate});
  } catch (err) {
    throw err;
  }
}

const setEnabledTemplate = async ({id, enabled}, dispatch) => {
  try {
    const enableMethod = enabled ? 'enable' : 'disable';
    const request = await CallServer.get('templates/' + id + '/' + enableMethod)
    const {updatedTemplate} = request;
    dispatch({type: enabled ? ENABLE_TEMPLATE : DISABLE_TEMPLATE, payload: updatedTemplate._id});
  } catch (err) {
    throw err;
  }
}

const updateTemplate = async ({id, templateData}, dispatch) => {
  try {
    const request = await CallServer.put('templates/' + id, templateData);
    const {updatedTemplate} = request;
    dispatch({type: UPDATE_TEMPLATE, payload: updatedTemplate});
  } catch (err) {
    throw err;
  }
}

const deleteTemplate = async (id, dispatch) => {
  try {
    const request = await CallServer.delete('templates/' + id);
    const {deletedTemplate} = request;
    dispatch({type: DELETE_TEMPLATE, payload: deletedTemplate._id});
  } catch (err) {
    throw err;
  }
};

export default {
  loadTemplates,
  loadTemplateCategories,
  selectTemplateCategories,
  addTemplate,
  setEnabledTemplate,
  updateTemplate,
  deleteTemplate,
};
