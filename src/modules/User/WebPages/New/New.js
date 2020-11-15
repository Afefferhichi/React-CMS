import React, {useContext} from "react";
import {Container} from "project-elements";
import {useHistory} from "react-router-dom";

import {MainContext} from "../../../../contexts/MainContext";
import WebPageEditorForm from "../../../../components/WebPageEditorForm";


const WebPagesNew = props => {
  const {addWebPage, dispatch} = useContext(MainContext);
  const history = useHistory();
  const onSaveWebPage = async webpageData => {
    // console.log('webpageContent', webpageContent);
    await addWebPage(webpageData, dispatch);
    history.replace('/webpages')
  }
  return (
    <Container>
      <WebPageEditorForm onSaveWebPage={onSaveWebPage}/>
    </Container>
  );
}

export default WebPagesNew;
