import React from "react";

import useDrawerMenuStyle from "../DrawerMenu.style";
import {Grid, ListItem, ListItemText, SettingsIcon} from "project-elements";

const Settings = props => {
  const styles = useDrawerMenuStyle();
  const {setDrawer, history} = props;
  return (
    <ListItem button onClick={() => {
      setDrawer(false);
      history.push('/settings');
    }}>
      <Grid container className={styles.grid} spacing={2} justify='flex-start' alignItems='center'>
        <Grid item xs={12} md={3}>
          <SettingsIcon/>
        </Grid>
        <Grid item xs={12} md={3}>
          <ListItemText primary='Settings'/>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default Settings;
