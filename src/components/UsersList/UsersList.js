import React, {useContext, useEffect, useRef} from "react";
import {MaterialTable, VpnKeyIcon} from 'project-elements';
import {makeStyles} from "@material-ui/core/styles";
import {MainContext} from "../../contexts/MainContext";
import UserForm from "./UserForm";
import PasswordChangeForm from "./PasswordChangeForm";
import CallServer from "../../utils/CallServer";

const useStyles = makeStyles({
  table: {
    margin: '3rem 2rem'
  }
});
const UsersList = props => {
  const {users, getUsers, deleteUser, openDialog, openSnackBar, dispatch} = useContext(MainContext);
  const classes = useStyles();
  const tableRef = useRef();

  const onPressAddHandler = () => {
    openDialog({title: 'New User', contentComponent: <UserForm refresh={+new Date()}/>}, dispatch);
  };

  const setEnabledHandler = async (event, user) => {
    const enableMethod = user.enabled ? 'disable' : 'enable';
    await CallServer.put('admin/setUserEnabled/' + user._id + '/' + enableMethod);
    openSnackBar({message: 'Successfully ' + enableMethod + 'd', severity: 'success'}, dispatch);
    getUsers(dispatch);
  }

  const onPressChangePasswordHandler = (event, user) => {
    openDialog({
      title: 'Change password',
      contentComponent: <PasswordChangeForm user={user} refresh={+new Date()}/>
    }, dispatch);
  }

  const onPressDeleteHandler = async (event, {_id}) => {
    try {
      if (!window.confirm('Are you sure to delete this user?')) return;
      await deleteUser(_id, dispatch);
      openSnackBar({message: 'Successfully deleted', severity: 'success'}, dispatch);
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
        options={{
          actionsColumnIndex: -1,
        }}
        title="Manage Users"
        columns={[
          {title: 'First Name', field: 'firstname'},
          {title: 'Email', field: 'email'},
          {title: 'Enabled', field: 'enabled', type: 'boolean'},
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
          rowData => ({
            tooltip: 'Enable',
            icon: 'visibility',
            disabled: rowData.enabled,
            onClick: setEnabledHandler
          }),
          rowData => ({
            tooltip: 'Disable',
            icon: 'visibility_off',
            disabled: !rowData.enabled,
            onClick: setEnabledHandler
          }),
          {
            tooltip: 'Change password',
            icon: VpnKeyIcon,
            onClick: onPressChangePasswordHandler
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