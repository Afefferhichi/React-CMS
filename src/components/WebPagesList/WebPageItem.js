import React from "react";
import {Avatar, Card, Grid, makeStyles, Typography} from "project-elements";
import {Link} from 'react-router-dom';
import constants from "../../config/constants";

const useStyles = makeStyles(theme => ({
  container: {
    padding: 20,
    marginBottom: 10,
  }
}));

const WebPageItem = (props) => {
  const classes = useStyles();
  const {webpage = {}} = props;
  webpage.author = webpage.author || {};
  return (
    <Card className={classes.container}>
      <Grid container spacing={1}>
        <Grid item xs={1}>
          <Avatar>
            <img
              alt={' '}
              src={constants.API_SERVER + 'attachments/' + webpage.author.photo}
            />
          </Avatar>
        </Grid>
        <Grid item xs={10}>
          <Typography variant={'h6'}>
            <Link to={'/webpages/' + webpage._id}>{webpage.name}</Link>
          </Typography>
          <Typography>
            {webpage.author.firstname} {webpage.author.lastname}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default WebPageItem;
