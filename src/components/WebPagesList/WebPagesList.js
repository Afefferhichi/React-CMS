import React from 'react';

import {Container} from 'project-elements';
import WebPageItem from "./WebPageItem";

const WebPagesList = (props) => {
  const {webpages} = props;
  return (
    <Container style={{width: 1000}}>
      {webpages && webpages.map(webpage => (
        <WebPageItem key={(index) => String(index)} webpage={webpage}/>
      ))}
    </Container>
  );
};

export default WebPagesList;
