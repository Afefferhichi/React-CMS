import React from "react";

import {Grid, ListItem, ListItemText, PeopleIcon} from "project-elements";
import useDrawerMenuStyle from "../DrawerMenu.style";

const ManageUsers = props => {
  const styles = useDrawerMenuStyle();
  const {setDrawer, history} = props;
  return (
    <ListItem button onClick={() => {
      setDrawer(false);
      history.push('/admin/users');
    }}>
      <Grid container className={styles.grid} spacing={2} justify='flex-start' alignItems='center'>
        <Grid item xs={12} md={3}>
          <PeopleIcon/>
        </Grid>
        <Grid item xs={12} md={3}>
          <ListItemText primary='Manage Users'/>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default ManageUsers;