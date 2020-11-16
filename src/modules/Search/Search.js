import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Typography} from 'project-elements';
import CallServer from "../../utils/CallServer";
import WebPagesList from "../../components/WebPagesList";

const Search = (props) => {
  const {query} = useParams();
  const [webpages, setWebpages] = useState(null);

  const loadSearchResults = async () => {
    try {
      const request = await CallServer.get('posts/search?q=' + query);
      if (request.success) {
        setWebpages(request.webpages);
      }
    } catch (e) {
    }
  }

  const componentDidMount = () => {
    loadSearchResults();
  }

  useEffect(componentDidMount, [query]);

  if (webpages === null) return null;

  return (
    <Container>
      <Typography variant={'h6'}>Results for: {query}</Typography>
      <br/>
      {webpages && webpages.length === 0
        ? ("No results")
        : (<WebPagesList webpages={webpages}/>)}
    </Container>
  );
}

export default Search;
