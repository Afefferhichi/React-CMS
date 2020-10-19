import React, {useContext} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {useFormik} from "formik";
import * as Yup from "yup";
import useFormStyles from "../Styles/form.style";
import {MainContext} from "../../../contexts/MainContext";
import CallServer from "../../../utils/CallServer";

const UpdatePassword = props => {
  const classes = useFormStyles();
  const {client, logout, dispatch} = useContext(MainContext);
  const updatePasswordForm = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: Yup.object().shape({
      currentPassword: Yup.string().required('Current Password is required').min(6, 'Current Password is 6 characters minimum'),
      newPassword: Yup.string().required('New Password is required').min(6, 'New Password is 6 characters minimum'),
      confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Passwords don\'t match')
    }),
    onSubmit: async ({newPassword, currentPassword}, {setFieldError}) => {
      try {
        const updateData = {
          mode: 'updatePassword',
          newPassword, currentPassword
        };
        const request = await CallServer.put('users/' + client._id, updateData);
        const {token} = request;
        if (token) {
          window.localStorage.setItem('token', token);
          await logout(dispatch);
        }
      } catch (err) {
        setFieldError('updateEmail', err.message);
      }
    }
  });

  return (
    <form className={classes.form} onSubmit={updatePasswordForm.handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="currentPassword"
        label="Current Password"
        type="password"
        id="currentPassword"
        autoComplete={'off'}
        value={updatePasswordForm.values.currentPassword}
        error={updatePasswordForm.errors.currentPassword && updatePasswordForm.touched.currentPassword}
        helperText={updatePasswordForm.errors.currentPassword && updatePasswordForm.errors.currentPassword}
        onChange={updatePasswordForm.handleChange}
        onBlur={updatePasswordForm.handleBlur}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="newPassword"
        label="New Password"
        type="password"
        id="newPassword"
        autoComplete="off"
        value={updatePasswordForm.values.newPassword}
        error={updatePasswordForm.errors.newPassword && updatePasswordForm.touched.newPassword}
        helperText={updatePasswordForm.errors.newPassword && updatePasswordForm.errors.newPassword}
        onChange={updatePasswordForm.handleChange}
        onBlur={updatePasswordForm.handleBlur}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="confirmNewPassword"
        label="Confirm New Password"
        type="password"
        id="confirmNewPassword"
        autoComplete="off"
        value={updatePasswordForm.values.confirmNewPassword}
        error={updatePasswordForm.errors.confirmNewPassword && updatePasswordForm.touched.confirmNewPassword}
        helperText={updatePasswordForm.errors.confirmNewPassword && updatePasswordForm.errors.confirmNewPassword}
        onChange={updatePasswordForm.handleChange}
        onBlur={updatePasswordForm.handleBlur}
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
        {updatePasswordForm.errors.updatePassword}
      </Typography>
    </form>
  );
};

export default UpdatePassword;