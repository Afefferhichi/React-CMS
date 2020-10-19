import React from "react";
import {Grid} from "project-elements";

const SettingsItems = props => {

  return (
    <Grid container spacing={3} justify='flex-start'>
      {props.children}
    </Grid>
  );
};

export default SettingsItems;