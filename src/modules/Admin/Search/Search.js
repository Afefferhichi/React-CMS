import React, { useContext, useState } from 'react';
import { MainContext } from '../../../contexts/MainContext';
import { useParams, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import EditIcon from '@material-ui/icons/Edit';
import FlagIcon from '@material-ui/icons/Flag';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import CommentIcon from '@material-ui/icons/Comment';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles(theme => ({
    grid: {
        flexGrow: 1
    },
    title: {
        marginBottom: '2rem',
        flexGrow: 1
    },
    button: {
        background: '#037F8C',
        color: 'white'
    },
    margin: {
        margin: theme.spacing(1),
    }
}));

const Search = () => {
    const classes = useStyles();
    const { client } = useContext(MainContext);
    const [ dialog, setDialog ] = useState(false);
    const { query } = useParams();

    const handleClickOpen = () => {
        setDialog(true);
    };

    const handleClose = () => {
        setDialog(false);
    };

    return client && client.role === 'user' ? (
        <Container maxWidth='md'>
            <Typography variant="h6" className={classes.title}>Results for: { query }</Typography>
            <Dialog open={dialog} onClose={handleClose}>
                <DialogTitle>Post</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth variant='outlined' label='Title' />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth variant='outlined' label='Content' />
                        </Grid>
                        <Grid item xs={12}>
                            <Button color='primary' variant='contained' fullWidth>Save</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button color='default' variant='text' fullWidth onClick={handleClose}>Cancel</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
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
                                            <IconButton onClick={handleClickOpen}>
                                                <EditIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <IconButton color='secondary'>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <p>Content: Content 1</p>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container className={classes.grid} spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container className={classes.grid} spacing={2} alignItems='center'>
                                                <Grid item xs={1}>
                                                    <Avatar>U</Avatar>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Typography variant="h6">Comment</Typography>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IconButton>
                                                        <ThumbUpIcon />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IconButton>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IconButton color='secondary'>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={classes.margin}>
                                        <Grid container spacing={4} alignItems="center">
                                            <Grid item >
                                                <CommentIcon />
                                            </Grid>
                                            <Grid item xs={11}>
                                                <TextField variant='outlined' label="Add Comment" fullWidth />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container className={classes.grid} spacing={2}>
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
                                <Grid item xs={12}>
                                    <p>Content: Content 2</p>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container className={classes.grid} spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container className={classes.grid} spacing={2} alignItems='center'>
                                                <Grid item xs={1}>
                                                    <Avatar>U</Avatar>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Typography variant="h6">Comment</Typography>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IconButton>
                                                        <ThumbUpIcon />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IconButton>
                                                        <ThumbDownIcon />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IconButton>
                                                        <FlagIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={classes.margin}>
                                        <Grid container spacing={4} alignItems="center">
                                            <Grid item>
                                                <CommentIcon />
                                            </Grid>
                                            <Grid item xs={11}>
                                                <TextField variant='outlined' label="Add Comment" fullWidth />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    ) : <Redirect to='/auth' />;
}
 
export default Search;