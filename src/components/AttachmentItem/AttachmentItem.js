import React, {useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {AttachmentIcon, CloseIcon, Grid, IconButton, Paper, Typography} from 'project-elements'
import useAttachmentItemStyle from './AttachmentItem.style';

const defaultProps = {
  onReadFiles: () => {
  },
};
const AttachmentItem = (props = defaultProps) => {
  const classes = useAttachmentItemStyle();
  const [files, setFiles] = useState([]);

  const onDrop = async (acceptedFiles) => {
    const files = await Promise.all(
      acceptedFiles.map((file) => {
        return new Promise((resolve, eject) => {
          const reader = new FileReader();
          reader.onabort = () => console.log('file reading was aborted')
          reader.onerror = () => console.log('file reading has failed')
          reader.onload = () => {
            resolve({fileBuffer: reader.result, fileInfo: file});
          };
          reader.readAsArrayBuffer(file);
        });
      })
    );
    setFiles(files);
    props.onReadFiles && props.onReadFiles(files);
  };

  const {getRootProps, getInputProps} = useDropzone({onDrop})

  const removeFileHandler = index => {
    let newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    props.onReadFiles && props.onReadFiles(files);
  };

  useEffect(()=>{
    setFiles([]);
  }, [props.refresh]);

  return (
    <Grid item>
      <Grid container>
        <Paper className={classes.fileContainer}>
          <div {...getRootProps()}>
            <input {...getInputProps()} multiple={true}/>
            <AttachmentIcon className={classes.attachmentIcon}/>
          </div>
        </Paper>
        {files && files.map((file, index) => (
          <Paper key={String(index)} elevation={2} className={classes.attachedItemContainer}>
            <Typography className={classes.float}>{file.fileInfo.name}</Typography>
            <IconButton
              color={'secondary'} size={'small'}
              onClick={() => removeFileHandler(index)}
            >
              <CloseIcon style={{fontSize: '1.2rem'}}/>
            </IconButton>
          </Paper>
        ))}
      </Grid>
    </Grid>
  )
}

export default AttachmentItem;
