import React, {useContext, useEffect, useState} from "react";
import {Container} from "project-elements";
import {useHistory} from "react-router-dom";

import {MainContext} from "../../../../contexts/MainContext";
import WebPageEditorForm from "../../../../components/WebPageEditorForm";
import CallServer from "../../../../utils/CallServer";


const WebPagesNew = props => {
  const {addWebPage} = useContext(MainContext);
  const [webpage, setWebPage] = useState(null);
  const template_id = (() => {
    try {
      return props.location.search.split('template_id=')[1]
    } catch (e) {
      return ''
    }
  })();

  const history = useHistory();
  const onSaveWebPage = async webpageData => {
    // console.log('webpageContent', webpageContent);
    await addWebPage(webpageData);
    history.replace('/webpages')
  }

  const loadWebPage = async () => {
    try {
      const request = await CallServer.get('templates/' + template_id);
      if (request.success) {
        const {html, design} = request.template;
        setWebPage({html, design});
      }
    } catch (e) {

    }
  }

  const componentDidMount = () => {
    loadWebPage();
  };

  useEffect(componentDidMount, []);

  if (!webpage) {
    return null;
  } else {
    return (
      <Container>
        <WebPageEditorForm webpage={webpage} onSaveWebPage={onSaveWebPage}/>
      </Container>
    );
  }
}

export default WebPagesNew;
