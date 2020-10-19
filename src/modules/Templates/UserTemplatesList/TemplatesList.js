import React, {useContext, useEffect} from 'react';
import {MainContext} from '../../../contexts/MainContext';
import {Redirect} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TemplateBox from "../../../components/TemplateBox";
import useTemplatesListStyles from './TemplatesList.style';

const TemplatesList = () => {
  const classes = useTemplatesListStyles();
  const {client, templates, loadTemplates, dispatch} = useContext(MainContext);
  const componentDidMount = () => {
    if (templates.length === 0) {
      loadTemplates(dispatch);
    }
  };
  useEffect(componentDidMount, []);
  return client && client.role === 'user' ? (
    <Container>
      <Grid container className={classes.grid} spacing={3} justify='flex-start' alignItems='flex-start'>
        {templates.map((template, index) => (
          <Grid key={String(index)} item xs={12} md={6}>
            <TemplateBox template={template}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  ) : <Redirect to='/auth'/>;
}

export default TemplatesList;