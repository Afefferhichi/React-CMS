import React, {useContext} from "react";
import {Button, Grid, TextField} from 'project-elements';
import {useFormik} from "formik";
import {MainContext} from "../../../contexts/MainContext";
import * as Yup from "yup";
import {capitalize} from "../../../utils/Misc";

const UserForm = props => {
  const {addUser, getUsers, closeDialog, openSnackBar, dispatch} = useContext(MainContext);

  const onPressCloseHandler = () => {
    closeDialog(dispatch);
  }

  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    address: '',
    organisation: '',
    telephone: ''
  };

  const form = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      firstname: Yup.string().required('First name is required'),
      lastname: Yup.string().required('Last name is required'),
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required'),
      address: Yup.string().required('Address is required'),
      organisation: Yup.string().required('Organisation is required'),
      telephone: Yup.string().required('Telephone is required'),
    }),
    onSubmit: async (formData) => {
      try {
        await addUser(formData, dispatch);
        getUsers(dispatch);
        onPressCloseHandler();
        openSnackBar({message: 'Successfully created', severity: 'success'}, dispatch);
      } catch (err) {
        alert(err.message);
      }
    }
  });

  return (
    <Grid container spacing={2}>
      {Object.keys(initialValues).map((key, index) => (
        <Grid key={String(index)} item xs={12}>
          <TextField
            type={key === 'password' ? 'password' : 'text'}
            fullWidth variant='outlined'
            label={
              key === 'firstname'
                ? 'First name'
                : key === 'lastname'
                ? 'Last name'
                : capitalize(key)
            }
            name={key}
            required
            error={form.errors[key] && form.touched[key]}
            value={form.values[key]}
            helperText={form.errors[key] && form.errors[key]}
            onChange={form.handleChange} onBlur={form.handleBlur}/>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button color='primary' variant='contained' fullWidth onClick={form.handleSubmit}>Save</Button>
      </Grid>
    </Grid>
  );
};

export default UserForm;