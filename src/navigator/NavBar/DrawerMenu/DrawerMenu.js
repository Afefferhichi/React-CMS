import React, {useState} from "react";
import {useHistory} from 'react-router-dom';

import {Drawer} from 'project-elements';
import styles from './DrawerMenu.style';
import DrawerMenuItems from './DrawerMenuItems';
import DrawerMenuList from "./DrawerMenuList";
import DrawerIcon from "./DrawerMenuItems/DrawerIcon";

const DrawerMenu = props => {
  const {client, logout} = props;
  const [drawer, setDrawer] = useState(false);
  const history = useHistory();
  return (
    <>
      <DrawerIcon setDrawer={setDrawer}/>
      <Drawer open={drawer} onClose={() => setDrawer(false)}>
        <DrawerMenuList className={styles.list}>
          <DrawerMenuItems.UserName client={client} firstname={client.firstname} role={client.role}/>
          <DrawerMenuItems.HomeButton history={history} setDrawer={setDrawer}/>
          {client.role === 'admin' && <DrawerMenuItems.ManageUsers history={history} setDrawer={setDrawer}/>}
          {client.role === 'admin' && <DrawerMenuItems.ManagePosts history={history} setDrawer={setDrawer}/>}
          {client.role === 'admin' && <DrawerMenuItems.ManageTemplates history={history} setDrawer={setDrawer}/>}
          {client.role !== 'admin' && <DrawerMenuItems.Templates history={history} setDrawer={setDrawer}/>}
          {client.role !== 'admin' && <DrawerMenuItems.WebPages history={history} setDrawer={setDrawer}/>}
          <DrawerMenuItems.Settings history={history} setDrawer={setDrawer}/>
          <DrawerMenuItems.LogoutButton history={history} setDrawer={setDrawer} logout={logout}/>
        </DrawerMenuList>
      </Drawer>
    </>
  )
};

export default DrawerMenu;