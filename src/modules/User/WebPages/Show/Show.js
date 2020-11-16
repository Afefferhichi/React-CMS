import React, {useEffect, useState} from "react";
import {Container, Typography} from 'project-elements'
import CallServer from "../../../../utils/CallServer";
import PostAddNew from "../../../../components/PostsList/PostsAddNew";
import PostsList from "../../../../components/PostsList";
import {getBodyHTML} from "../../../../utils/Misc";

const Show = props => {
  const webpage_id = props.match.params.id;
  const [webpage, setWebPage] = useState(null);

  const loadWebPage = async webpage_id => {
    try {
      const request = await CallServer.get('webpages/' + webpage_id);
      const {webpage} = request;
      setWebPage(webpage);
    } catch (error) {
      console.log('Error on loading webpages', error);
    }
  }

  const componentDidMount = () => {
    loadWebPage(webpage_id).then(r => r);
  };

  useEffect(componentDidMount, []);
  if (!webpage) {
    return (
      <Container>
        No such a web page
      </Container>
    );
  } else {
    return (
      <Container>
        <Typography variant={'h5'}>&nbsp;{webpage.name}</Typography>
        <br />
        <PostAddNew webpage_id={webpage_id}/>
        <div dangerouslySetInnerHTML={{__html: getBodyHTML(webpage.html)}}/>
        <PostsList webpage_id={webpage_id}/>
      </Container>
    );
  }
}

export default Show;
