import React, {useContext, useState} from "react";
import FileResizer from "react-image-file-resizer";
import {Button, Grid, Typography} from "project-elements";
import useFormStyles from '../Styles/form.style';
import {MainContext} from "../../../contexts/MainContext";
import {useFormik} from "formik";
import CallServer from "../../../utils/CallServer";
import constants from "../../../config/constants";

const formData = {}
const UpdateAvatar = props => {
  const [isSelectingImage, setIsSelectingImage] = useState(0);
  const {client, getClientInfo, dispatch} = useContext(MainContext);
  const classes = useFormStyles();
  const updateAvatarForm = useFormik({
    initialValues: {
      attachments: '',
    },
    onSubmit: async ({attachments}, {setFieldError}) => {
      try {
        const file = formData.file;
        if (file) {
          const avatarFormData = new FormData();
          avatarFormData.append('mode', 'updateAvatar');
          avatarFormData.append('attachments', new File([await file.arrayBuffer()], file.name, file));
          const request = await CallServer.putWithFile('users/' + client._id, avatarFormData)
          const {updatedUser} = request;
          if (updatedUser._id) {
            await getClientInfo(dispatch);
            window.location.reload();
          }
          formData.file = null;
        }
      } catch (err) {
        console.log('error on upload', err)
        setFieldError('updateEmail', err.message);
      }
    }
  });

  const resizeFile = (file) => Promise.all([
    new Promise(resolve => {
      FileResizer.imageFileResizer(file, 100, 100, 'PNG', 100, 0,
        uri => {
          resolve(uri);
        },
        'blob'
      );
    }),
    new Promise(resolve => {
      FileResizer.imageFileResizer(file, 100, 100, 'PNG', 100, 0,
        uri => {
          resolve(uri);
        },
        'base64'
      );
    })
  ])

  const onFileSelectHandler = async (e) => {
    const {target: {files}} = e;
    const resizedFiles = await resizeFile(files[0]);
    formData['file'] = resizedFiles[0];
    formData.selectingImage = resizedFiles[1];
    setIsSelectingImage(+new Date());
  };

  const removePhotoHandler = async () => {
    const avatarFormData = new FormData();
    avatarFormData.append('mode', 'updateAvatar');
    const request = await CallServer.putWithFile('users/' + client._id, avatarFormData)
    const {updatedUser} = request;
    if (updatedUser._id) {
      await getClientInfo(dispatch);
      window.location.reload();
      // setIsSelectingImage(0);
    }
  }

  return (
    <form className={classes.form} onSubmit={updateAvatarForm.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <h6 style={{textAlign: 'center', color: 'rgba(7, 7, 10, 1)'}}>Select an avatar</h6>
          <label htmlFor="avatar" className={classes.fileUpload}>
            <div>
              {isSelectingImage > 0
                ? (
                  <img alt={''} id='thumbImage' src={formData.selectingImage}/>
                )
                : (
                  client && client.photo && client.photo._id && (
                    <img
                      alt={''}
                      src={constants.API_SERVER + 'attachments/' + client.photo._id}/>
                  )
                )
              }
              <input
                type='file'
                accept='image/*'
                id='avatar'
                multiple={false}
                style={{display: 'none'}}
                onChange={onFileSelectHandler}
              />
            </div>
          </label>
        </Grid>
        <Grid item md={6}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
          >
            Update
          </Button>
          <Button
            onClick={removePhotoHandler}
            variant="contained"
            color="secondary"
            fullWidth
            className={classes.submit}
          >
            Remove
          </Button>
        </Grid>
      </Grid>
      <Typography component="h1" variant="h6" className={classes.error}>
      </Typography>
    </form>
  );
};

export default UpdateAvatar;