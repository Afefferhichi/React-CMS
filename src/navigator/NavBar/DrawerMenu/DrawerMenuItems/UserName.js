import React from "react";

import {Avatar, Grid, ListItem, Typography} from 'project-elements';
import useDrawerMenuStyle from "../DrawerMenu.style";
import constants from "../../../../config/constants";

const UserName = props => {
  const {client} = props;
  const styles = useDrawerMenuStyle();
  const {role, firstname} = props;
  return (
    <ListItem>
      <Grid container className={styles.grid} spacing={2} justify='flex-start'>
        <Grid item xs={12} md={4}>
          <Avatar>
            {client.photo === null
              ? (client.role === 'admin' ? 'A' : 'U')
              : (
                <img
                  alt={''}
                  width={50}
                  src={constants.API_SERVER + 'attachments/' + client.photo._id}/>
              )
            }
          </Avatar>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" className={styles.text}>{firstname || role}</Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default UserName;