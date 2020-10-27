import React, {useContext} from "react";
import {Button, Grid, TextField} from 'project-elements';
import {useFormik} from "formik";
import {MainContext} from "../../../contexts/MainContext";
import * as Yup from "yup";
import CallServer from "../../../utils/CallServer";

const PasswordChangeForm = props => {
  const {_id, firstname, lastname, email} = props.user;
  const {closeDialog, openSnackBar, dispatch} = useContext(MainContext);

  const onPressCloseHandler = () => {
    closeDialog(dispatch);
  }

  const initialValues = {
    password: '',
  };

  const form = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (formData) => {
      try {
        await CallServer.put('changeUserPassword/' + _id, {
          mode: 'updatePasswordByAdmin',
          newPassword: form.values.password,
        });
        openSnackBar({message: 'Successfully updated the password', severity: 'success'}, dispatch);
        onPressCloseHandler();
      } catch (err) {
        openSnackBar({message: err.message, severity: 'success'}, dispatch);
        onPressCloseHandler();
      }
    }
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <label>{firstname} {lastname} &lt;{email}&gt;</label>
      </Grid>
      <Grid item xs={12}>
        <TextField
          type={'password'}
          fullWidth variant='outlined'
          label={'Password'}
          name={'password'}
          required
          error={form.errors['password'] && form.touched['password']}
          value={form.values['password']}
          helperText={form.errors['password'] && form.errors['password']}
          onChange={form.handleChange} onBlur={form.handleBlur}/>
      </Grid>
      <Grid item xs={12}>
        <Button color='primary' variant='contained' fullWidth onClick={form.handleSubmit}>Change</Button>
      </Grid>
    </Grid>
  );
};

export default PasswordChangeForm;