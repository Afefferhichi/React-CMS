import React from "react";
import {useHistory} from 'react-router-dom';
import {EditIcon,} from 'project-elements';
import './template.styles.css'

const TemplateBox = props => {
  const {_id, name, category, description} = props.template
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
        <p><span>Category:</span> {category} </p>
      </div>
      <div className="des_middle">{(description || '')}</div>
      <div className="bottom">
        <button onClick={pressPreviewHandler}>Create <EditIcon/></button>
      </div>
    </div>
  );
};

export default TemplateBox;
