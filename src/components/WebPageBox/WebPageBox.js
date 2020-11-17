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
  const {_id, name} = props.webpage;
  const {deleteWebPage, openSnackBar} = useContext(MainContext);
  const history = useHistory();

  const pressEditHandler = () => {
    history.push('/webpages/' + _id + '/edit')
  }

  const pressDeleteHandler = async () => {
    if(!window.confirm('Are you sure to delete this webpage?')) return;
    try {
      await deleteWebPage(_id);
    } catch (deleteError) {
      if(deleteError.error_code === 'ACCESS_DENIED') {
        openSnackBar({message: "You can't delete this webpage", severity: 'error'});
      }
    }
  }

  const pressShowHandler = () => {
    history.push('/webpages/' + _id);
  }

  return (
    <Card>
      <CardContent>
        <Divider/>
        <Paper outline={1} style={{padding: 10}} dangerouslySetInnerHTML={{__html: nl2br(name || '')}}/>
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
