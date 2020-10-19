import React from "react";
import {List} from 'project-elements';

const DrawerMenuList = props => {
  return (
    <List className={props.className}>
      {props.children}
    </List>
  );
};

export default DrawerMenuList;