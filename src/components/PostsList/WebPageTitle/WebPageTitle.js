import React from "react";
import {Typography} from "project-elements";

const WebPageTitle = (props) => {
  const {name} = props;
  return (
    <Typography variant={'h5'}>
      {name}
    </Typography>
  );
};

export default WebPageTitle;
