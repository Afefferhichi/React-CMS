import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Button, Container, TextField, Typography} from "project-elements";
import useTemplateEditorStyles from "./TemplateEditorForm.style";
import CustomTemplateEditor from "../CustomTemplateEditor";

const G_Object = {};

const TemplateEditorForm = props => {
  const {onSaveTemplate, template = {}} = props;
  const classes = useTemplateEditorStyles();
  const form = useFormik({
    initialValues: {
      name: template.name,
      category: template.category,
      description: template.description,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      category: Yup.string().required('Category is required'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: async (form, {setFieldError}) => {
      try {
        const {name, category, description} = form;
        const {getTemplateData} = G_Object;
        const templateData = getTemplateData && (await getTemplateData());
        onSaveTemplate && onSaveTemplate({...templateData, name, category, description})
      } catch (err) {
        setFieldError('form', err.message);
      }
    }
  });

  const getTemplateData = (getContentDataFunc) => {
    G_Object.getTemplateData = getContentDataFunc;
  }

  return (
    <Container>
      <CustomTemplateEditor template={template} getTemplateData={getTemplateData}/>
      <form className={classes.form} onSubmit={form.handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
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
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="category"
          label="Category"
          name="category"
          value={form.values.category}
          error={form.errors.category && form.touched.category}
          helperText={form.errors.category && form.errors.category}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          autoComplete={'off'}
        />
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

export default TemplateEditorForm;