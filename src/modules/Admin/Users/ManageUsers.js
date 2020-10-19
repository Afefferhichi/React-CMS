import React, { useContext, useRef, useState, useEffect } from 'react';
import { MainContext } from '../../../contexts/MainContext';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useFormik } from 'formik';

const useStyles = makeStyles({
    table: {
        margin: '3rem 2rem'
    }
});

export default () => {
    const { client, users, getUsers, addUser, deleteUser, dispatch } = useContext(MainContext);
    const classes = useStyles();
    const tableRef = useRef();
    const [ dialog, setDialog ] = useState(false);
    const history = useHistory();

    const handleClickOpen = () => {
        setDialog(true);
    };

    const handleClose = () => {
        setDialog(false);
    };

    useEffect(() => {
        (async() => {
            try {
                await getUsers(dispatch);
            } catch(err) {
                alert('Error getting users! Try again later');
            }
        })();
        // eslint-disable-next-line
    }, []);

    const form = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            address: '',
            organisation: '',
            telephone: ''
        },
        onSubmit: async (formData) => {
            try {
                await addUser(formData, dispatch);
                handleClose();
                history.push('/admin/users');
            } catch (err) {
                alert(err.message);
            }
        }
    });

    return (
        <>
            <Dialog open={dialog} onClose={handleClose}>
                <DialogTitle>User</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth variant='outlined' label='First Name' name="firstname" value={form.values.firstname} onChange={form.handleChange} onBlur={form.handleBlur} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth variant='outlined' label='Last Name' name="lastname" value={form.values.lastname} onChange={form.handleChange} onBlur={form.handleBlur} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth variant='outlined' label='Email' name="email" value={form.values.email} onChange={form.handleChange} onBlur={form.handleBlur} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth variant='outlined' type='password' label='Password' name="password" value={form.values.password} onChange={form.handleChange} onBlur={form.handleBlur} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth variant='outlined' label='Address' name="address" value={form.values.address} onChange={form.handleChange} onBlur={form.handleBlur} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth variant='outlined' label='Telephone' name="telephone" value={form.values.telephone} onChange={form.handleChange} onBlur={form.handleBlur} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth variant='outlined' label='Organisation' name="organisation" value={form.values.organisation} onChange={form.handleChange} onBlur={form.handleBlur} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button color='primary' variant='contained' fullWidth onClick={form.handleSubmit}>Save</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button color='default' variant='text' fullWidth onClick={handleClose}>Cancel</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            {
                client && client.role === 'admin' ? (
                    <div className={classes.table}>
                        <MaterialTable
                            title="Manage Users"
                            columns={[
                                { title: 'First Name', field: 'firstname' },
                                { title: 'Email', field: 'email' }
                            ]}  
                            tableRef={tableRef}
                            data={users}
                            actions={[
                                {
                                    tooltip: 'Add',
                                    icon: 'add',
                                    isFreeAction: true,
                                    onClick: () => handleClickOpen()
                                },
                                {
                                    tooltip: 'Delete',
                                    icon: 'delete',
                                    onClick: async(event, { _id }) => {
                                        try {
                                            await deleteUser(_id, dispatch);
                                        } catch(err) {
                                            alert('Error deleting user! Try again later');
                                        }
                                    }
                                }
                            ]}
                        />
                    </div>
                )
                : <Redirect to='/auth' />
            }
        </>
    );
}