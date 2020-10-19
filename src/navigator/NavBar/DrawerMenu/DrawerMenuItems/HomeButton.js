import React from "react";

import {Grid, ListItem, ListItemText} from "@material-ui/core";
import {HomeIcon} from "project-elements";
import useDrawerMenuStyle from "../DrawerMenu.style";

const HomeButton = props => {
  const {setDrawer, history} = props;
  const styles = useDrawerMenuStyle();
  return (
    <ListItem button onClick={() => {
      setDrawer(false);
      history.push('/home');
    }}>
      <Grid container className={styles.grid} spacing={2} justify='flex-start' alignItems='center'>
        <Grid item xs={12} md={3}>
          <HomeIcon/>
        </Grid>
        <Grid item xs={12} md={3}>
          <ListItemText primary='Home'/>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default HomeButton;