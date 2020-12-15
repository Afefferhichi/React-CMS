import React, {createContext, createRef, useEffect, useReducer} from 'react';
import MainReducer from './reducers';

import UserActions from './actions/UserActions';
import PostActions from './actions/PostActions';
import ContactMessageActions from './actions/ContactMessageActions';
import CommentActions from './actions/CommentActions';
import TemplateActions from './actions/TemplateActions';
import WebPageActions from './actions/WebPageActions';
import SnackbarActions from "./actions/SnackbarActions";
import Dialog2Actions from "./actions/Dialog2Actions";

export const MainContext = createContext();
export let dispatch2 = {};
export const InitialState = {
  client: null,
  users: [],
  posts: [],
  contact_messages: [],
  post: null,
  templates: [],
  selected_template_categories: [],
  webpages: [],
  webpage: null,
  snackbar: {},
  dialog2: null,
};

const MainContextProvider = ({children}) => {
  const clientInfo = (JSON.parse(localStorage.getItem('clientInfo')));
  const selected_template_categories_info = (JSON.parse(localStorage.getItem('selected_template_categories')));

  const [{
    client, users, posts, contact_messages, post, templates, selected_template_categories,
    webpages, webpage, snackbar, dialog2
  }, dispatch] =
    useReducer(MainReducer, {
      ...InitialState,
      client: clientInfo,
      selected_template_categories: selected_template_categories_info
    });

  dispatch2 = dispatch;

  useEffect(() => {
    localStorage.setItem('clientInfo', (JSON.stringify(client)))
  }, [client]);
  useEffect(() => {
    localStorage.setItem('selected_template_categories', (JSON.stringify(selected_template_categories)))
  }, [selected_template_categories]);

  const domRef = createRef();
  return (
    <MainContext.Provider
      ref={domRef}
      value={{
        dispatch,
        client,
        users,
        posts,
        contact_messages,
        post,
        templates,
        selected_template_categories,
        webpages,
        webpage,
        snackbar,
        dialog2,
        ...UserActions,
        ...PostActions,
        ...ContactMessageActions,
        ...CommentActions,
        ...TemplateActions,
        ...WebPageActions,
        ...SnackbarActions,
        ...Dialog2Actions,
      }}>
      {children}
    </MainContext.Provider>
  )
}

export default MainContextProvider;
