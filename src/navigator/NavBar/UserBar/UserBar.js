import React, {useState} from "react";

import {
  AccountCircleIcon,
  Avatar,
  Button,
  ExitToAppIcon,
  Grid,
  ListItemText,
  Menu,
  MenuItem,
  SettingsIcon,
} from 'project-elements'

import useUserBarStyle from './UserBar.style'
import constants from "../../../config/constants";

const UserBar = props => {
  const {client, setDrawerOpen, logout, history} = props;
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const styles = useUserBarStyle();

  const openUserMenu = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const closeUserMenu = () => {
    setUserAnchorEl(null);
  };

  return (
    <>
      {client.firstname + ' ' + client.lastname}
      <Button onClick={openUserMenu}>
        <Avatar>
          {client.photo === null
            ? (client.role === 'admin' ? 'A' : 'U')
            : (
              <img
                width={50}
                alt={''}
                src={constants.API_SERVER + 'attachments/' + client.photo._id}/>
            )
          }
        </Avatar>
      </Button>
      <Menu
        anchorEl={userAnchorEl}
        keepMounted
        open={Boolean(userAnchorEl)}
        onClose={closeUserMenu}
      >
        {client.role === 'user' && (
          <MenuItem onClick={() => {
            history.push('/settings');
            closeUserMenu();
          }}>
            <Grid container className={styles.grid} spacing={2} justify='flex-start' alignItems='center'>
              <Grid item xs={12} md={3}>
                <AccountCircleIcon/>
              </Grid>
              <Grid item xs={12} md={3}>
                <ListItemText primary='Profile' onClick={() => {
                  setDrawerOpen(false);
                }}/>
              </Grid>
            </Grid>
          </MenuItem>
        )}
        <MenuItem onClick={() => {
          history.push('/settings');
          closeUserMenu();
        }}>
          <Grid container className={styles.grid} spacing={2} justify='flex-start' alignItems='center'>
            <Grid item xs={12} md={3}>
              <SettingsIcon/>
            </Grid>
            <Grid item xs={12} md={3}>
              <ListItemText primary='Settings' onClick={() => {
                setDrawerOpen(false);
                history.push('/settings');
              }}/>
            </Grid>
          </Grid>
        </MenuItem>
        <MenuItem onClick={() => {
          history.push('/');
          logout();
          closeUserMenu();
        }}>
          <Grid container className={styles.grid} spacing={2} justify='flex-start' alignItems='center'>
            <Grid item xs={12} md={3}>
              <ExitToAppIcon/>
            </Grid>
            <Grid item xs={12} md={3}>
              <ListItemText primary='Logout'/>
            </Grid>
          </Grid>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserBar