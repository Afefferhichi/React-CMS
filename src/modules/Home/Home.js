import React, {useContext} from 'react';
import {MainContext} from '../../contexts/MainContext';
import AdminHome from "./AdminHome";
import UserHome from "./UserHome";

export default () => {
  const {client} = useContext(MainContext);
  return (
    client
      ? client.role === 'admin' ? <AdminHome/> : <UserHome/>
      : null
  );
};