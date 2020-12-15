import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Container, Divider, Grid} from 'project-elements';
import {MainContext} from '../../../../contexts/MainContext';
import TemplateBox from "../../../../components/TemplateBox";
import useTemplatesListStyles from './List.style';
import SearchInput from "../../../../components/SearchInput/SearchInput";

const TemplatesList = () => {
  const {client, templates, selected_template_categories, loadTemplates, loadTemplateCategories, selectTemplateCategories} = useContext(MainContext);
  const [allTemplateCategories, setAllTemplateCategories] = useState([]);
  const [defaultTemplateCategories, setDefaultTemplateCategories] = useState(null);
  const classes = useTemplatesListStyles();

  const componentDidMount = () => {
    setDefaultTemplateCategories(selected_template_categories);
    loadTemplateCategories().then(categories => {
      setAllTemplateCategories(categories);
    });

    if (selected_template_categories && selected_template_categories.length > 0) {
      loadTemplates({categories: selected_template_categories});
    }
  };

  const onPressSearchHandler = () => {
    loadTemplates({categories: selected_template_categories});
  }

  const onChangeSearchInputHandler = async (event, selectedOptions) => {
    await selectTemplateCategories(selectedOptions);
  }

  useEffect(onPressSearchHandler, [selected_template_categories]);

  useEffect(componentDidMount, []);
  return client && client.role === 'user' ? (
    <Container>
      <Grid container className={classes.grid} spacing={3} justify='flex-start' alignItems='flex-start'>
        <Grid item xs={12}>
          {defaultTemplateCategories &&
          <SearchInput
            label={"Search templates by category"}
            onChange={onChangeSearchInputHandler}
            options={allTemplateCategories || []}
            defaultValue={defaultTemplateCategories || []}
            style={{marginLeft: 30, float: 'left', width: '50%'}}/>}
        </Grid>
      </Grid>
      <Grid container className={classes.grid} spacing={3} justify='flex-start' alignItems='flex-start'>
        {templates && templates.map((template, index) => (
          <Grid key={String(index)} item xs={12} md={6}>
            <TemplateBox template={template}/>
          </Grid>
        ))}
      </Grid>
      <Grid container className={classes.grid} spacing={3} justify='flex-start' alignItems='flex-start'>
        <Grid item xs={12}>
          <Divider/>
        </Grid>
      </Grid>
    </Container>
  ) : <Redirect to='/auth'/>;
}

export default TemplatesList;
