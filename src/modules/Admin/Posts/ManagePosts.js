import React, { useContext } from 'react';
import { MainContext } from '../../../contexts/MainContext';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles({
    grid: {
        flexGrow: 1
    }
});

export default () => {
    const { client } = useContext(MainContext);
    const classes = useStyles();

    return (
        <>
            {
                client && client.role === 'admin' ? (
                    <Container maxWidth='md'>
                        <Grid container className={classes.grid} spacing={3}>
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        <Grid container className={classes.grid} spacing={2} alignItems='center'>
                                            <Grid item xs={10}>
                                                <Grid container className={classes.grid} spacing={0} alignItems='center'>
                                                    <Grid item xs={1}>
                                                        <Avatar>U</Avatar>
                                                    </Grid>
                                                    <Grid item xs={11}>
                                                        <Typography variant="h6">Title: Post 1</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Grid container className={classes.grid} spacing={2}>
                                                    <Grid item xs={6}>
                                                        <IconButton color='secondary'>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <IconButton>
                                                            <CheckIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <p>Content: Content 1</p>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        <Grid container className={classes.grid} spacing={2} alignItems='center'>
                                            <Grid item xs={10}>
                                                <Grid container className={classes.grid} spacing={0} alignItems='center'>
                                                    <Grid item xs={1}>
                                                        <Avatar>U</Avatar>
                                                    </Grid>
                                                    <Grid item xs={11}>
                                                        <Typography variant="h6">Title: Post 2</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Grid container className={classes.grid} spacing={2}>
                                                    <Grid item xs={6}>
                                                        <IconButton color='secondary'>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <IconButton>
                                                            <CheckIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <p>Content: Content 2</p>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                )
                : <Redirect to='/auth' />
            }
        </>
    );
}