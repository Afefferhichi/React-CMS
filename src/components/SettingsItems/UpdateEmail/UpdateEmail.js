import React, {useContext} from "react";
import {Button, TextField, Typography} from "project-elements";
import {useFormik} from "formik";
import * as Yup from "yup";
import {MainContext} from "../../../contexts/MainContext";
import CallServer from '../../../utils/CallServer'
import useFormStyles from "../Styles/form.style";


const UpdateEmail = props => {
  const classes = useFormStyles();
  const {client, logout, dispatch} = useContext(MainContext);
  const updateEmailForm = useFormik({
    initialValues: {
      currentEmail: '',
      newEmail: ''
    },
    validationSchema: Yup.object().shape({
      currentEmail: Yup.string().required('Current Email is required').email('Current Email is invalid'),
      newEmail: Yup.string().required('New Email is required').email('New Email is invalid')
    }),
    onSubmit: async ({newEmail, currentEmail}, {setFieldError}) => {
      try {
        const updateData = {
          mode: 'updateEmail',
          newEmail, currentEmail
        };
        const request = await CallServer.put('users/' + client._id, updateData);
        const {updatedUser} = request;
        if (updatedUser._id) {
          logout(dispatch);
        }
      } catch (err) {
        setFieldError('updateEmail', err.message);
      }
    }
  });

  return (
    <form className={classes.form} onSubmit={updateEmailForm.handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="currentEmail"
        label="Current Email"
        name="currentEmail"
        autoComplete="off"
        value={updateEmailForm.values.currentEmail}
        error={updateEmailForm.errors.currentEmail && updateEmailForm.touched.currentEmail}
        helperText={updateEmailForm.errors.currentEmail && updateEmailForm.errors.currentEmail}
        onChange={updateEmailForm.handleChange}
        onBlur={updateEmailForm.handleBlur}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="newEmail"
        label="New Email"
        name="newEmail"
        autoComplete={'off'}
        value={updateEmailForm.values.newEmail}
        error={updateEmailForm.errors.newEmail && updateEmailForm.touched.newEmail}
        helperText={updateEmailForm.errors.newEmail && updateEmailForm.errors.newEmail}
        onChange={updateEmailForm.handleChange}
        onBlur={updateEmailForm.handleBlur}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Update
      </Button>
      <Typography component="h1" variant="h6" className={classes.error}>
        {updateEmailForm.errors.updateEmail}
      </Typography>
    </form>
  );
};

export default UpdateEmail;