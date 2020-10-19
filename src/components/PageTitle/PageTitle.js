import React from "react";
import {makeStyles, Typography} from "project-elements";

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: '2rem',
    flexGrow: 1
  },
}));

const PageTitle = props => {
  const classes = useStyles();
  return (
    <Typography variant="h6" className={classes.title}>{props.children}</Typography>
  );
};

export default PageTitle;