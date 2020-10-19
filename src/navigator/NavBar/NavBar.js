import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {AppBar, Toolbar} from 'project-elements';
import {MainContext} from '../../contexts/MainContext';

import useNavBarStyles from "./NavBar.styles";
import DrawerMenu from './DrawerMenu';
import TitleBar from "./TitleBar";
import SearchBar from "./SearchBar";
import NotificationBar from "./NotificationBar";
import UserBar from "./UserBar";

export default () => {
  const styles = useNavBarStyles();
  const {client, logout, dispatch} = useContext(MainContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const history = useHistory();

  return client ? (
    <div className={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <DrawerMenu open={drawerOpen} client={client} logout={()=>logout(dispatch)}/>
          <TitleBar/>
          {client.role === 'admin' && <SearchBar history={history}/>}
          <NotificationBar/>
          <UserBar client={client} logout={()=>logout(dispatch)} setDrawerOpen={setDrawerOpen} history={history}/>
        </Toolbar>
      </AppBar>
    </div>
  ) : <></>;
}