import React, {useContext, useEffect, useRef} from "react";
import MaterialTable from "material-table";
import {makeStyles} from "@material-ui/core/styles";
import {MainContext} from "../../contexts/MainContext";
import UserForm from "./UserForm/UserForm";

const useStyles = makeStyles({
  table: {
    margin: '3rem 2rem'
  }
});
const UsersList = props => {
  const {users, getUsers, deleteUser, openDialog, dispatch} = useContext(MainContext);
  const classes = useStyles();
  const tableRef = useRef();

  const onPressAddHandler = () => {
    openDialog({title: 'User', contentComponent: <UserForm refresh={+new Date()}/>}, dispatch);
  };

  const onPressDeleteHandler = async (event, {_id}) => {
    try {
      if (!window.confirm('Are you sure to delete this user?')) return;
      await deleteUser(_id, dispatch);
    } catch (err) {
      alert('Error deleting user! Try again later');
    }
  }

  const componentDidMount = () => {
    getUsers(dispatch).then(r => r).catch(error => {
      alert('Error getting users! Try again later');
      console.log('Error getting users', error);
    });
  };
  useEffect(componentDidMount, []);
  return (
    <div className={classes.table}>
      <MaterialTable
        title="Manage Users"
        columns={[
          {title: 'First Name', field: 'firstname'},
          {title: 'Email', field: 'email'}
        ]}
        tableRef={tableRef}
        data={users}
        actions={[
          {
            tooltip: 'Add',
            icon: 'add',
            isFreeAction: true,
            onClick: onPressAddHandler
          },
          {
            tooltip: 'Delete',
            icon: 'delete',
            onClick: onPressDeleteHandler
          }
        ]}
      />
    </div>
  );
}

export default UsersList;