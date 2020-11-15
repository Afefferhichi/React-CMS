import React, {useEffect, useState} from "react";
import {Container} from 'project-elements'
import CallServer from "../../../../utils/CallServer";
import PostAddNew from "../../../../components/PostsList/PostsAddNew";
import PostsList from "../../../../components/PostsList";

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

  return (
    <Container>
      <PostAddNew/>
      <div dangerouslySetInnerHTML={{__html: (webpage && webpage.html)}}/>
      <p>&nbsp;</p>
      <Container>
        <PostsList/>
      </Container>
    </Container>
  );
}

export default Show;
