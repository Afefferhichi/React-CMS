import React, {useState} from "react";
import {Button, CommentIcon, Grid, TextField} from "project-elements";
import AttachmentItem from "../../AttachmentItem";
import {makeAttachFormData} from "../../../utils/Misc";
import DownloadLinkItem from "../../DownloadLinkItem";

const CommentForm = props => {
  const {onSave, itemData = {}} = props;
  const comment = itemData;
  const [cmtValue, setCmtValue] = useState(String(comment.cmtValue || ''));
  const [attachments, setAttachments] = useState(comment.attachments || []);
  const [saving, setSaving] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const formData = {
    cmtValue: '',
    attachments: []
  };

  const keyPressHandler = async (e) => {
    const {charCode} = e;
    if (charCode === 13) {
      await saveFormHandler();
    }
  };
  const changeValueHandler = e => {
    setCmtValue(e.target.value);
  };
  const onReadFiles = (files) => {
    setAttachments(files);
  };
  const saveFormHandler = async () => {
    setSaving(true);
    formData['cmtValue'] = cmtValue;
    formData['attachments'] = attachments;
    onSave && (await onSave(makeAttachFormData(formData)));
    setRefresh(+new Date());
    setCmtValue('');
    setSaving(false);
  };
  return (
    <Grid container spacing={2} alignItems="center" ml={10}>
      <Grid item xs={1} container alignItems="center" justify={'center'}>
        <CommentIcon/>
      </Grid>
      <Grid item xs={11}>
        <TextField
          disabled={saving}
          onKeyPress={keyPressHandler}
          onChange={changeValueHandler}
          value={cmtValue}
          variant='outlined' label="Add Comment" fullWidth/>
        <AttachmentItem refresh={refresh} onReadFiles={onReadFiles}/>
      </Grid>
      {comment.attachments && comment.attachments.length > 0 && (
        <Grid item xs={12}>
          {comment.attachments.map((attachment, index) => (
            <DownloadLinkItem key={String(index)} showOnly={true} attachment={attachment}/>
          ))}
        </Grid>
      )}

      {(
        <Grid container justify={'flex-end'}>
          <Button disabled={saving} color='primary' variant='contained'
                  onClick={saveFormHandler}>Save</Button>
        </Grid>
      )}
    </Grid>
  );
};

export default CommentForm;