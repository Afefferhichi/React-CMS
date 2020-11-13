import React, {useContext} from "react";
import {useHistory} from 'react-router-dom';
import {
  Card,
  CardActions,
  CardContent,
  DeleteIcon,
  Divider,
  EditIcon,
  IconButton,
  Paper,
  VisibilityIcon,
} from 'project-elements';
import {nl2br} from "../../utils/Misc";
import {MainContext} from "../../contexts/MainContext";

const WebPageBox = props => {
  const {_id, description} = props.webpage;
  const {deleteWebPage, dispatch} = useContext(MainContext);
  const history = useHistory();

  const pressEditHandler = () => {
    history.push('/webpages/' + _id + '/edit')
  }

  const pressDeleteHandler = () => {
    deleteWebPage(_id, dispatch);
  }

  const pressShowHandler = () => {
    history.push('/webpages/' + _id);
  }

  return (
    <Card>
      <CardContent>
        <Divider/>
        <Paper outline={1} style={{padding: 10}} dangerouslySetInnerHTML={{__html: nl2br(description || '')}}/>
      </CardContent>
      <CardActions>
        <IconButton onClick={pressEditHandler}>
          <EditIcon/>
        </IconButton>
        <IconButton onClick={pressDeleteHandler}>
          <DeleteIcon/>
        </IconButton>
        <IconButton onClick={pressShowHandler}>
          <VisibilityIcon/>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default WebPageBox;
