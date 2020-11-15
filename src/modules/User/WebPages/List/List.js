import React, {useContext, useEffect} from 'react';
import {MainContext} from '../../../../contexts/MainContext';
import {Redirect} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import WebPageBox from "../../../../components/WebPageBox";
import useWebPagesListStyles from './List.style';

const WebPagesList = () => {
  const classes = useWebPagesListStyles();
  const {client, webpages, loadWebPages, dispatch} = useContext(MainContext);
  const componentDidMount = () => {
    if (webpages.length === 0) {
      loadWebPages(dispatch);
    }
  };
  useEffect(componentDidMount, []);
  return client && client.role === 'user' ? (
    <Container>
      <Grid container className={classes.grid} spacing={3} justify='flex-start' alignItems='flex-start'>
        {webpages.map((webpage, index) => (
          <Grid key={String(index)} item xs={12} md={6}>
            <WebPageBox webpage={webpage}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  ) : <Redirect to='/auth'/>;
}

export default WebPagesList;
