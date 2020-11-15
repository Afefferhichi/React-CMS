import React from "react";
import {useHistory} from 'react-router-dom';
import {Button, Container, Grid, Paper, Typography} from "project-elements";
import useHomeStyle from './AdminHome.style';

const AdminHome = props => {
  const classes = useHomeStyle();
  const history = useHistory();

  const {firstname} = props;

  return (
    <Container>
      <Typography variant="h6" className={classes.title}>Welcome {firstname}. What do you want to do
        ?</Typography>
      <Grid container className={classes.grid} spacing={3} justify='center' alignItems='center'>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} className={classes.paper}>
            <Button variant='contained' className={classes.button}
                    onClick={() => history.push('/admin/users')}>Manage Users</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} className={classes.paper}>
            <Button variant='contained' className={classes.button}
                    onClick={() => history.push('/admin/posts')}>Manage Posts</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} className={classes.paper}>
            <Button variant='contained' className={classes.button}
                    onClick={() => history.push('/admin/templates')}>Manage Templates</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} className={classes.paper}>
            <Button variant='contained' className={classes.button}
                    onClick={() => history.push('/settings')}>Go to Settings</Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminHome;