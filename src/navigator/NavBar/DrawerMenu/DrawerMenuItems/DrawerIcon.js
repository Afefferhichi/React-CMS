import React from "react";

import {MenuIcon} from "project-elements";
import {IconButton} from "@material-ui/core";

import useDrawerMenuStyle from "../DrawerMenu.style";

const DrawerIcon = props => {
  const styles = useDrawerMenuStyle();
  const {setDrawer} = props;
  return (
    <IconButton
      edge="end" className={styles.menuButton} color="inherit" aria-label="menu"
      onClick={() => setDrawer(true)}>
      <MenuIcon/>
    </IconButton>
  );
};

export default DrawerIcon