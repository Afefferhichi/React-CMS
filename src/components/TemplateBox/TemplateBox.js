import React from "react";
import {useHistory} from 'react-router-dom';
import {Card, CardActions, CardContent, EditIcon, Divider, IconButton, Paper, Typography,} from 'project-elements';
import {nl2br} from "../../utils/Misc";

const TemplateBox = props => {
  const {_id, name, category, description} = props.template
  const history = useHistory();

  const pressPreviewHandler = () => {
    history.push('/webpages/new/?template_id=' + _id)
  }
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography>Category: {category}</Typography>
        <Divider/>
        <Paper outline={1} style={{padding: 10}} dangerouslySetInnerHTML={{__html: nl2br(description || '')}}/>
      </CardContent>
      <CardActions>
        <IconButton onClick={pressPreviewHandler}>
          <EditIcon/>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TemplateBox;
