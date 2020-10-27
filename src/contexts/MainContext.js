import React, {createContext, createRef, useEffect, useReducer} from 'react';
import MainReducer from './reducers';

import UserActions from './actions/UserActions';
import PostActions from './actions/PostActions';
import CommentActions from './actions/CommentActions';
import TemplateActions from './actions/TemplateActions';
import SnackbarActions from "./actions/SnackbarActions";
import Dialog2Actions from "./actions/Dialog2Actions";

export const MainContext = createContext();
export let dispatch2 = {};

const MainContextProvider = ({children}) => {
  const clientInfo = (JSON.parse(localStorage.getItem('clientInfo')));

  const [{client, users, posts, post, templates, snackbar, dialog2}, dispatch] =
    useReducer(MainReducer, {
      client: clientInfo,
      users: [],
      posts: [],
      post: null,
      templates: [],
      snackbar: {},
      dialog2: null,
    });

  dispatch2 = dispatch;

  useEffect(() => {
    localStorage.setItem('clientInfo', (JSON.stringify(client)))
  }, [client]);

  const domRef = createRef();
  return (
    <MainContext.Provider
      ref={domRef}
      value={{
        dispatch,
        client,
        users,
        posts,
        post,
        templates,
        snackbar,
        dialog2,
        ...UserActions,
        ...PostActions,
        ...CommentActions,
        ...TemplateActions,
        ...SnackbarActions,
        ...Dialog2Actions,
      }}>
      {children}
    </MainContext.Provider>
  )
}

export default MainContextProvider;