import React from "react";
import {useHistory} from 'react-router-dom';
import {Card, CardActions, CardContent, EditIcon, Divider, IconButton, Paper, Typography,} from 'project-elements';
import {nl2br} from "../../utils/Misc";
import './template.styles.css'

const TemplateBox = props => {
  const {_id, name, category, description} = props.template
  console.log(category
    )
  const history = useHistory();

  const pressPreviewHandler = () => {
    history.push('/webpages/new/?template_id=' + _id)
  }
  return (
    <div className="designed_card">
      <div className="top">
    <h2>{name}</h2>
      </div>
    <div className="middle"> 
      <p> <span>Category:</span> {category} </p>
    </div>
  <div className="des_middle">{(description || '')}</div>
      <div className="bottom">
        <button onClick={pressPreviewHandler}>Create <EditIcon/></button>
      </div>
    </div>
  );
};

export default TemplateBox;
