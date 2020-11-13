import React, {useContext} from 'react';
import {MainContext} from '../../contexts/MainContext';
import AdminHome from "../Admin/Home";
import UserHome from "../User/Home";

export default () => {
  const {client} = useContext(MainContext);
  return (
    client
      ? client.role === 'admin' ? <AdminHome/> : <UserHome/>
      : null
  );
};
