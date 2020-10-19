import {makeStyles} from "project-elements";

export default makeStyles(theme => ({
  grid: {
    flexGrow: 1,
    marginTop: '2rem'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

