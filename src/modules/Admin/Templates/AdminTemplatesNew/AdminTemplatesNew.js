import React, {useContext} from "react";
import {Redirect} from "react-router-dom";
import {Container} from "project-elements";

import {MainContext} from "../../../../contexts/MainContext";
import TemplateEditorForm from "../../../../components/TemplateEditorForm";


const AdminTemplatesNew = props => {
  const {client, addTemplate, dispatch} = useContext(MainContext);
  const onSaveTemplate = async templateData => {
    // console.log('templateContent', templateContent);
    await addTemplate(templateData, dispatch);
    window.history.back();
  }
  return (
    <>
      {
        client && client.role === 'admin' ? (
          <Container>
            <TemplateEditorForm onSaveTemplate={onSaveTemplate}/>
          </Container>
        ) : <Redirect to='/auth'/>
      }
    </>
  );
}

export default AdminTemplatesNew;