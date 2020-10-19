import React, {useState} from "react";

import {Badge, IconButton, Menu, MenuItem, NotificationsIcon} from 'project-elements';
import useNotificationBarStyle from './NotificationBar.style'

const NotificationBar = () => {
  const styles = useNotificationBarStyle();
  const [notificationAnchorEl, setNotificationUserAnchorEl] = useState(null);


  const openNotificationMenu = (event) => {
    setNotificationUserAnchorEl(event.currentTarget);
  };

  const closeNotificationMenu = () => {
    setNotificationUserAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={openNotificationMenu}>
        <Badge badgeContent={2} color="primary">
          <NotificationsIcon className={styles.notification}/>
        </Badge>
      </IconButton>
      <Menu
        anchorEl={notificationAnchorEl}
        keepMounted
        open={Boolean(notificationAnchorEl)}
        onClose={closeNotificationMenu}
      >
        <MenuItem>Notification 1</MenuItem>
        <MenuItem>Notification 2</MenuItem>
      </Menu>
    </>
  );
};

export default NotificationBar;