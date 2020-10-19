import React from "react";

import {Grid, ListItem, ListItemText, PagesIcon} from "project-elements";
import useDrawerMenuStyle from "../DrawerMenu.style";

const ManageTemplates = props => {
  const styles = useDrawerMenuStyle();
  const {setDrawer, history} = props;
  return (
    <ListItem button onClick={() => {
      setDrawer(false);
      history.push('/admin/templates');
    }}>
      <Grid container className={styles.grid} spacing={2} justify='flex-start' alignItems='center'>
        <Grid item xs={12} md={3}>
          <PagesIcon/>
        </Grid>
        <Grid item xs={12} md={3}>
          <ListItemText primary='Manage Templates'/>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default ManageTemplates;
