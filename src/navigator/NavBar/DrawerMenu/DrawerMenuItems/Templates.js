import React from "react";

import {Grid, ListItem, ListItemText, PagesIcon} from "project-elements";
import useDrawerMenuStyle from "../DrawerMenu.style";

const Templates = props => {
  const styles = useDrawerMenuStyle();
  const {setDrawer, history} = props;
  return (
    <ListItem button onClick={() => {
      setDrawer(false);
      history.push('/templates');
    }}>
      <Grid container className={styles.grid} spacing={2} justify='flex-start' alignItems='center'>
        <Grid item xs={12} md={3}>
          <PagesIcon/>
        </Grid>
        <Grid item xs={12} md={3}>
          <ListItemText primary='Templates'/>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default Templates;