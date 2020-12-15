import React, {useContext, useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';

import {Badge, IconButton, Menu, MenuItem, NotificationsIcon} from 'project-elements';
import useNotificationBarStyle from './NotificationBar.style'
import CallServer from "../../../utils/CallServer";
import {MainContext} from "../../../contexts/MainContext";

const NotificationBar = () => {
  const styles = useNotificationBarStyle();
  const history = useHistory();
  const {client, loadTime} = useContext(MainContext);
  const [notificationAnchorEl, setNotificationUserAnchorEl] = useState(null);
  const [newMessagesCount, setNewMessagesCount] = useState(0);

  const openNotificationMenu = (event) => {
    setNotificationUserAnchorEl(event.currentTarget);
  };

  const closeNotificationMenu = () => {
    setNotificationUserAnchorEl(null);
  };

  const checkNewMessages4Admin = async () => {
    const request = await CallServer.get('contact_messages/unseen');
    if (request.success && request.messages) {
      setNewMessagesCount(request.messages.length);
    }
  };

  const openNewMessages = () => {
    closeNotificationMenu();
    history.push('/admin/contact_messages')
  }

  const componentDidMount = () => {
    client.role === 'admin' && checkNewMessages4Admin()
  };

  useEffect(componentDidMount, [loadTime]);

  let badgeCount = 0;
  badgeCount = +(
    newMessagesCount > 0 ? 1 : 0
  );
  return (
    <>
      <IconButton onClick={openNotificationMenu}>
        <Badge badgeContent={badgeCount} color="secondary">
          <NotificationsIcon className={styles.notification}/>
        </Badge>
      </IconButton>
      {badgeCount > 0 && (
        <Menu
          style={{marginTop: 30}}
          anchorEl={notificationAnchorEl}
          keepMounted
          open={Boolean(notificationAnchorEl)}
          onClose={closeNotificationMenu}
        >
          {newMessagesCount > 0 && (
            <MenuItem onClick={openNewMessages}>New message arrived</MenuItem>
          )}
        </Menu>
      )}
    </>
  );
};

export default NotificationBar;
