import React, {useContext, useEffect, useState} from "react";
import {Container, Typography} from 'project-elements'
import PostAddNew from "../../../../components/PostsList/PostsAddNew";
import PostsList from "../../../../components/PostsList";
import {getBodyHTML} from "../../../../utils/Misc";
import {MainContext} from "../../../../contexts/MainContext";
import FollowWebPageBox from "../../../../components/FollowWebPageBox";

const Show = props => {
  const webpage_id = props.match.params.id;
  const {client, webpage, loadWebPage} = useContext(MainContext);
  const [bodyHTML, setBodyHTML] = useState('');

  const componentDidMount = () => {
    loadWebPage(webpage_id);
  };

  const onWebPageIsLoaded = () => {
    if (webpage && webpage._id === webpage_id) {
      setBodyHTML(getBodyHTML(webpage.html));
    }
  }

  useEffect(componentDidMount, []);
  useEffect(onWebPageIsLoaded, [webpage]);

  if (!webpage) {
    return null;
  } else {
    return (
      <Container>
        <Typography variant={'h5'}>&nbsp;{webpage.name}</Typography>
        <div style={{float: 'right'}}>
          {client._id === webpage.author && (
            <PostAddNew webpage_id={webpage_id}/>
          )}
          {client._id !== webpage.author && (
            <FollowWebPageBox followers={webpage.followers} follower_id={client._id} webpage_id={webpage_id}/>
          )}
        </div>
        <div dangerouslySetInnerHTML={{__html: bodyHTML}}/>
        <PostsList listType={'byWebPage'} webpage_id={webpage_id}/>
      </Container>
    );
  }
}

export default Show;
