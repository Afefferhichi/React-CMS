import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ExpandMoreIcon,
  Grid,
  Typography
} from "project-elements";
import useCommonStyles from "./Styles/common.style";

const SettingsItem = props => {
  const {title, component} = props;
  const classes = useCommonStyles();
  return (
    <Grid item xs={12} md={6} >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
        >
          <Typography variant={'h6'} className={classes.heading}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {component}
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default SettingsItem;