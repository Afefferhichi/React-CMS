import React, {useContext, useState} from "react";
import {MainContext} from "../../../contexts/MainContext";
import {Grid} from 'project-elements';
import {Button, CircularProgress, Divider, TextField} from "../../../themes/mui/Elements";
import {useFormik} from "formik";
import * as Yup from "yup";

const ContactMessage = props => {
  const {addContactMessage, closeDialog, openSnackBar, dispatch} = useContext(MainContext);

  const [onSaving, setOnSaving] = useState(false);


  const form = useFormik({
    initialValues: {
      title: '',
      email: '',
      content: '',
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Title is required'),
      email: Yup.string().required('Email is required').email('Email is invalid'),
      content: Yup.string().required('Content is required'),
    }),
    onSubmit: async ({title, email, content}, {setFieldError}) => {
      try {
        await addContactMessage({title, email, content});
        openSnackBar({message: 'Successfully sent!', severity: 'success'}, dispatch);
        setOnSaving(false);
        closeDialog();
      } catch (err) {
        // openSnackBar({message: err.message, severity: 'error'}, dispatch);
        setFieldError('email', err.message);
      }
    }
  });

  return (
    <form className="base-container base-container-login" onSubmit={form.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="off"
            value={form.values.title}
            error={form.errors.title && form.touched.title}
            helperText={form.errors.title && form.errors.title}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="off"
            value={form.values.email}
            error={form.errors.email && form.touched.email}
            helperText={form.errors.email && form.errors.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            rows={5} multiline
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="content"
            label="Content"
            name="content"
            autoComplete="off"
            value={form.values.content}
            error={form.errors.content && form.touched.content}
            helperText={form.errors.content && form.errors.content}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider/>
        </Grid>
        <Grid item xs={12}>
          <Button type={'submit'} disabled={onSaving} color='primary' variant='contained' fullWidth>
            {onSaving ? <CircularProgress size={'0.8rem'} style={{marginTop: 5, marginBottom: 5}}/> : 'Save'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContactMessage;
