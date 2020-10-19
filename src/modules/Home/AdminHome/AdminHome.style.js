import {makeStyles} from "project-elements";

export default makeStyles(theme => ({
  grid: {
    flexGrow: 1
  },
  paper: {
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    marginBottom: '2rem',
    flexGrow: 1
  },
  button: {
    background: '#03A6A6',
    color: 'white'
  },
  margin: {
    margin: theme.spacing(1),
  },
  add: {
    marginBottom: '2rem'
  }
}));
