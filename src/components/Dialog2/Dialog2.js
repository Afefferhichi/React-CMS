import React, {useContext} from "react";
import {Button, Dialog, DialogContent, DialogTitle, Grid} from "project-elements";
import {dispatch2, MainContext} from "../../contexts/MainContext";
import useDialog2Style from "./Dialog2.style";

const Dialog2 = props => {
  const classes = useDialog2Style();

  const {dialog2, closeDialog} = useContext(MainContext);
  if (dialog2 === null) return null;
  const {title, contentComponent} = dialog2;
  return (
    dialog2 && dialog2.opened && (
      <Dialog open={dialog2.opened} onClose={() => closeDialog(dispatch2)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {contentComponent}
          <Grid item xs={12} className={classes.cancelButton}>
            <Button color='default' variant='text' fullWidth onClick={() => closeDialog(dispatch2)}>Cancel</Button>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  );
};

export default Dialog2;