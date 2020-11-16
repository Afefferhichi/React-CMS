import React, {useContext, useEffect, useState} from "react";

import {MainContext} from "../../../../contexts/MainContext";
import CallServer from "../../../../utils/CallServer";
import WebPageEditorForm from "../../../../components/WebPageEditorForm";

const Edit = props => {
  const webpage_id = props.match.params.id;
  const {client, updateWebPage, dispatch} = useContext(MainContext);
  const [webpage, setWebPage] = useState(null);

  const onSaveWebPage = async (webpageData) => {
    if (webpage_id) {
      await updateWebPage({id: webpage_id, webpageData}, dispatch);
    }
    window.history.back();
  }

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

  if (!client || !webpage) {
    return null;
  } else {
    return (
      <WebPageEditorForm webpage={webpage} onSaveWebPage={onSaveWebPage}/>
    );
  }
}

export default Edit;
