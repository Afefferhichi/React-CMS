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
      description: webpage.description,
    },
    validationSchema: Yup.object().shape({
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: async (form, {setFieldError}) => {
      try {
        const {description} = form;
        const {getWebPageData} = G_Object;
        const webpageData = getWebPageData && (await getWebPageData());
        onSaveWebPage && onSaveWebPage({...webpageData, description})
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
          id="description"
          label="Description"
          name="description"
          value={form.values.description}
          error={form.errors.description && form.touched.description}
          helperText={form.errors.description && form.errors.description}
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
