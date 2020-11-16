import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Button, Container, TextField, Typography} from "project-elements";
import useWebPageEditorStyles from "./WebPageEditorForm.style";
import CustomHTMLEditor from "../CustomHTMLEditor";

const G_Object = {};

const WebPageEditorForm = props => {
  const {onSaveWebPage, webpage = {}} = props;
  const classes = useWebPageEditorStyles();
  const form = useFormik({
    initialValues: {
      name: webpage.name,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('name is required'),
    }),
    onSubmit: async (form, {setFieldError}) => {
      try {
        const {name} = form;
        const {getWebPageData} = G_Object;
        const webpageData = getWebPageData && (await getWebPageData());
        onSaveWebPage && onSaveWebPage({...webpageData, name})
      } catch (err) {
        setFieldError('form', err.message);
      }
    }
  });

  const getWebPageData = (getContentDataFunc) => {
    G_Object.getWebPageData = getContentDataFunc;
  }

  return (
    <Container>
      <CustomHTMLEditor htmlData={webpage} getHTMLData={getWebPageData}/>
      <form className={classes.form} onSubmit={form.handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          multiline={true}
          id="name"
          label="Name"
          name="name"
          value={form.values.name}
          error={form.errors.name && form.touched.name}
          helperText={form.errors.name && form.errors.name}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          autoComplete={'off'}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Save
        </Button>
        <Typography component="h1" variant="h6" className={classes.error}>
          {form.errors.form}
        </Typography>
        <div style={{width: '100%', height: 100}}/>
      </form>
    </Container>
  );
};

export default WebPageEditorForm;
