import React from "react";
import EmailEditor from "react-email-editor";

const CustomHTMLEditor = props => {
  const {getHTMLData, htmlData} = props;
  const emailEditorRef = React.useRef(null);
  const exportHTMLData = () => {
    return new Promise((resolve, eject) => {
      emailEditorRef.current.exportHtml(data => {
        const {html, design} = data;
        resolve({html, design: JSON.stringify(design)});
      });
    })
  };
  const onLoad = () => {
    if (htmlData) {
      setTimeout(()=> {
        emailEditorRef.current && emailEditorRef.current.editor.loadDesign(JSON.parse(htmlData.design));
      }, 300)
    }
    getHTMLData && getHTMLData(exportHTMLData);
  };

  return (
    <EmailEditor
      style={{overflow: 'scroll'}}
      ref={emailEditorRef}
      onLoad={onLoad}
    />
  );
};

export default CustomHTMLEditor;
