import React, {useContext} from "react";
import {useHistory} from 'react-router-dom';
import {
  Card,
  CardActions,
  CardContent,
  CheckIcon,
  Divider,
  IconButton,
  Paper,
  Typography,
  VisibilityIcon,
  VisibilityOffIcon,
} from 'project-elements';
import {nl2br} from "../../utils/Misc";
import {MainContext} from "../../contexts/MainContext";
import CallServer from "../../utils/CallServer";

const TemplateBox = props => {
  const {_id, name, category, description, users} = props.template
  const {client, getClientInfo, loadTemplates, dispatch} = useContext(MainContext);
  const is_in_use = users.indexOf(client._id) > -1;
  const history = useHistory();
  const pressCheckHandler = async () => {
    const makeInUseMethod = is_in_use ? 'make-un-use' : 'make-in-use';
    const request = await CallServer.get('templates/' + _id + '/' + client._id + '/' + makeInUseMethod);
    if (request.success === true) {
      getClientInfo(dispatch);
      loadTemplates(dispatch);
    }
  }
  const pressPreviewHandler = () => {
    history.push('/admin/templates/' + _id + '/edit')
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
        <IconButton onClick={pressCheckHandler}>
          {is_in_use
            ? <VisibilityIcon/>
            : <VisibilityOffIcon/>}
        </IconButton>
        <IconButton onClick={pressPreviewHandler}>
          <CheckIcon/>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TemplateBox;