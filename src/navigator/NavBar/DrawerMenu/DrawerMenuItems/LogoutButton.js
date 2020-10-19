import React from "react";

import {ExitToAppIcon, Grid, ListItem, ListItemText} from "project-elements";
import useDrawerMenuStyle from "../DrawerMenu.style";

const LogoutButton = props => {
  const styles = useDrawerMenuStyle();
  const {setDrawer, logout, history} = props;
  return (
    <ListItem button onClick={() => {
      setDrawer(false);
      logout();
      history.push('/')
    }}>
      <Grid container className={styles.grid} spacing={2} justify='flex-start' alignItems='center'>
        <Grid item xs={12} md={3}>
          <ExitToAppIcon/>
        </Grid>
        <Grid item xs={12} md={3}>
          <ListItemText primary='Logout'/>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default LogoutButton;