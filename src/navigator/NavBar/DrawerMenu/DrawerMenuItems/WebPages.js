import React from "react";

import {FileCopyIcon, Grid, ListItem, ListItemText} from "project-elements";
import useDrawerMenuStyle from "../DrawerMenu.style";

const WebPages = props => {
  const styles = useDrawerMenuStyle();
  const {setDrawer, history} = props;
  return (
    <ListItem button onClick={() => {
      setDrawer(false);
      history.push('/webpages');
    }}>
      <Grid container className={styles.grid} spacing={2} justify='flex-start' alignItems='center'>
        <Grid item xs={12} md={3}>
          <FileCopyIcon/>
        </Grid>
        <Grid item xs={12} md={3}>
          <ListItemText primary='Web Pages'/>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default WebPages;