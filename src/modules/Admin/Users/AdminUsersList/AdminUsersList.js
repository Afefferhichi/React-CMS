import React, {useContext} from "react";
import {Redirect} from "react-router-dom";
import {MainContext} from "../../../../contexts/MainContext";

import useStyles from './AdminUsersList.style';
import UsersList from "../../../../components/UsersList";

const AdminUsersList = props => {
  const {client} = useContext(MainContext);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {
        client && client.role === 'admin' ? (
            <UsersList/>
          )
          : <Redirect to='/auth'/>
      }
    </div>
  );
};

export default AdminUsersList;