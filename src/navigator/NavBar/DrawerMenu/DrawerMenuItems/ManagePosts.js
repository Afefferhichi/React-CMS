import React from "react";

import {Grid, ListItem, ListItemText, ViewAgendaIcon} from "project-elements";
import useDrawerMenuStyle from "../DrawerMenu.style";

const ManagePosts = props => {
  const styles = useDrawerMenuStyle();
  const {setDrawer, history} = props;
  return (
    <>
      <ListItem button onClick={() => {
        setDrawer(false);
        history.push('/admin/posts');
      }}>
        <Grid container className={styles.grid} spacing={2} justify='flex-start' alignItems='center'>
          <Grid item xs={12} md={3}>
            <ViewAgendaIcon/>
          </Grid>
          <Grid item xs={12} md={3}>
            <ListItemText primary='Manage Posts'/>
          </Grid>
        </Grid>
      </ListItem>
    </>
  );
};

export default ManagePosts;