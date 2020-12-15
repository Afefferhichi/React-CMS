import React from "react";
import {Link} from 'react-router-dom';
import {Typography, HomeIcon} from "project-elements";

const WebPageTitle = (props) => {
  const {name, id} = props;
  return (
    <Typography variant={'h5'}>
      {name} &nbsp;
      <Link to={'/webpages/' + id} title={'Go to owner\'s web page'}>
        <HomeIcon />
      </Link>
    </Typography>
  );
};

export default WebPageTitle;
