import React from "react";
import EmailEditor from "react-email-editor";

const CustomTemplateEditor = props => {
  const {getTemplateData, template} = props;
  const emailEditorRef = React.useRef(null);
  const exportTemplateData = () => {
    return new Promise((resolve, eject) => {
      emailEditorRef.current.exportHtml(data => {
        const {html, design} = data;
        resolve({html, design: JSON.stringify(design)});
      });
    })
  };
  const onLoad = () => {
    // you can load your template here;
    // const templateJson = {};
    if (template) {
      setTimeout(()=> {
        emailEditorRef.current && emailEditorRef.current.editor.loadDesign(JSON.parse(template.design));
      }, 300)
    }
    getTemplateData && getTemplateData(exportTemplateData);
  };

  return (
    <EmailEditor
      style={{overflow: 'scroll'}}
      ref={emailEditorRef}
      onLoad={onLoad}
    />
  );
};

export default CustomTemplateEditor;