import React, {useState} from "react";
import {Button, CircularProgress, Divider, Grid, TextField} from "project-elements";
import {br2nl, makeAttachFormData, nl2br} from "../../../utils/Misc";
import AttachmentItem from "../../AttachmentItem";
import DownloadLinkItem from "../../DownloadLinkItem";

const PostForm = props => {
  const [onSaving, setOnSaving] = useState(false);
  const {onSave, post: {attachments = [], pstTitle = '', pstContent = ''} = {}} = props;
  const formData = {
    pstTitle,
    pstContent,
    attachments: []
  };
  const saveFormHandler = async () => {
    try {
      setOnSaving(true);
      formData.pstContent = nl2br(formData.pstContent);
      const attachedFormData = makeAttachFormData(formData);
      onSave && (await onSave(attachedFormData));
    } catch (e) {
      console.log('error on onSave', e, formData);
      setOnSaving(false);
    }
  };
  const onChangeHandler = (e) => {
    const {target: {name, value}} = e;
    formData[name] = value;
  };

  const onReadFiles = (files) => {
    formData['attachments'] = files;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField autoComplete={'off'} fullWidth variant='outlined' label='Title' defaultValue={pstTitle}
                   name={'pstTitle'}
                   onChange={onChangeHandler}/>
      </Grid>
      <Grid item xs={12}>
        <TextField multiline fullWidth variant='outlined' label='Content' defaultValue={br2nl(pstContent)}
                   name={'pstContent'}
                   onChange={onChangeHandler}/>
      </Grid>
      <Grid item xs={12}>
        {attachments.map((attachment, index) => (
          <DownloadLinkItem key={String(index)} showOnly={true} attachment={attachment}/>
        ))}
      </Grid>
      <AttachmentItem onReadFiles={onReadFiles}/>
      <Grid item xs={12}>
        <Divider/>
      </Grid>
      <Grid item xs={12}>
        <Button disabled={onSaving} color='primary' variant='contained' fullWidth onClick={saveFormHandler}>
          {onSaving ? <CircularProgress size={'0.8rem'} style={{marginTop: 5, marginBottom: 5}}/> : 'Save'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default PostForm;