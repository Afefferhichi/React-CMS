import React, {useContext, useEffect, useState} from "react";
import {Redirect} from "react-router-dom";

import {MainContext} from "../../../../contexts/MainContext";
import CallServer from "../../../../utils/CallServer";
import TemplateEditorForm from "../../../../components/TemplateEditorForm";

const Edit = props => {
  const template_id = props.match.params.id;
  const {client, updateTemplate, dispatch} = useContext(MainContext);
  const [template, setTemplate] = useState(null);

  const onSaveTemplate = async (templateData) => {
    if (template_id) {
      await updateTemplate({id: template_id, templateData}, dispatch);
    }
    window.history.back();
  }

  const loadTemplate = async template_id => {
    try {
      const request = await CallServer.get('templates/' + template_id);
      const {template} = request;
      setTemplate(template);
    } catch (error) {
      console.log('Error on loading templates', error);
    }
  }

  const componentDidMount = () => {
    loadTemplate(template_id).then(r => r);
  };

  useEffect(componentDidMount, []);

  return (
    <>
      {
        client && (client.role === 'admin' || client.role === 'user') ? (
          <>
            {template && <TemplateEditorForm template={template} onSaveTemplate={onSaveTemplate}/>}
          </>
        ) : <Redirect to='/auth'/>
      }
    </>
  );
}

export default Edit;
