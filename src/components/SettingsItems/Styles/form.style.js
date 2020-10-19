import {makeStyles} from "project-elements";

export default makeStyles(theme => ({
  form: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red'
  },
  fileUpload: {
    marginLeft: "auto",
    marginRight: "auto",
    cursor: 'pointer',
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    width: '150px',
    height: '150px',
    border: '3px dashed rgba(7, 7, 10, 1)',
  },
}));

