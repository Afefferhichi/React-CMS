import React, {useContext} from "react";
import {useHistory} from 'react-router-dom';
import {DeleteIcon, EditIcon, VisibilityIcon,} from 'project-elements';
import {MainContext} from "../../contexts/MainContext";
import './webpage.styles.css'

const WebPageBox = props => {
  const {_id, name} = props.webpage;
  const {deleteWebPage, openSnackBar} = useContext(MainContext);
  const history = useHistory();

  const pressEditHandler = () => {
    history.push('/webpages/' + _id + '/edit')
  }

  const pressDeleteHandler = async () => {
    if (!window.confirm('Are you sure to delete this webpage?')) return;
    try {
      await deleteWebPage(_id);
    } catch (deleteError) {
      if (deleteError.error_code === 'ACCESS_DENIED') {
        openSnackBar({message: "You can't delete this webpage", severity: 'error'});
      }
    }
  }

  const pressShowHandler = () => {
    history.push('/webpages/' + _id);
  }

  return (
    <div className="designed_card webpage_box-card">
      <div className="top">
        <div className="text_box"><h2>{name || ''}</h2></div>
      </div>
      <div className="bottom">
        <button onClick={pressEditHandler}><EditIcon/></button>
        <button onClick={pressDeleteHandler}><DeleteIcon/></button>
        <button onClick={pressShowHandler}><VisibilityIcon/></button>
      </div>
    </div>
  );
};

export default WebPageBox;
