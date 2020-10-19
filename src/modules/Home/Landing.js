import React, { useContext } from 'react';
import { MainContext } from '../../contexts/MainContext';
import Logo from '../../assets/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import PeopleIcon from '@material-ui/icons/People';
import PagesIcon from '@material-ui/icons/Pages';

const useStyles = makeStyles(theme => ({
    container: {
        height: 'auto'
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        width: '5rem',
        height: '3rem',
        margin: '0.1rem'
    },
    home: {
        height: '300px',
        backgroundImage: 'linear-gradient(151deg, #0b6fda, #07e3a1)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    vision: {
        height: '300px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    services: {
        height: '300px',
        background: 'lightgray',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    footer: {
        height: '300px',
        backgroundImage: 'linear-gradient(151deg, #0b6fda, #07e3a1)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerLogo: {
        width: '10rem',
        height: '8rem',
        margin: '0.1rem'
    }
}));

const Landing = () => {
    const classes = useStyles();
    const history = useHistory();
    const { client } = useContext(MainContext);

    return !client ? ( 
        <div className={classes.container}>
            <AppBar position='sticky' style={{ background: 'white' }}>
                <Toolbar>
                    <img src={Logo} alt='logo' className={classes.logo} />
                    <div className={classes.title}></div>
                    <Link href='#home'>
                        <Button>Home</Button>
                    </Link>
                    <Link href='#vision'>
                        <Button>Our Vision</Button>
                    </Link>
                    <Link href='#services'>
                        <Button>Our Services</Button>
                    </Link>
                    <Button onClick={() => history.push('/auth')}>Get Started</Button>
                </Toolbar>
            </AppBar>
            <div id='home' className={classes.home}>
                <Typography variant='h3'>Building trust..</Typography>
                <Typography variant='h3'>Creating opportunities..</Typography>
                <p style={{ marginTop: '2rem' }}>
                    By reconnecting the market stakeholders, 3almadmoon builds a trusted marketplace with strong business relationships and secure solutions.
                </p>
            </div>
            <div id='vision' className={classes.vision}>
                <Typography variant='h4' style={{ textAlign: 'center' }}>To be the most trusted and innovative <br /> trading platform in MENA</Typography>
                <img src='http://www.3almadmoon.info/images/Vision_1.svg' alt='vision' style={{ marginTop: '2rem' }} />
            </div>
            <div id='services' className={classes.services}>
                <Typography variant='h4'>Our Services</Typography>
                <Grid container spacing={3} justify='center' alignItems='center' style={{ marginTop: '2rem' }}>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent className={classes.cardContent}>
                                <PagesIcon />
                                <Typography variant='h6' style={{ textAlign: 'center' }}>Template Editor</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent className={classes.cardContent}>
                                <ViewAgendaIcon />
                                <Typography variant='h6' style={{ textAlign: 'center' }}>CMS</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent className={classes.cardContent}>
                                <PeopleIcon />
                                <Typography variant='h6' style={{ textAlign: 'center' }}>Administration</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.footer}>
                <img src={Logo} alt='logo' className={classes.footerLogo} />
                <Typography variant="body2" align="center" style={{ marginTop: '2rem' }}>
                    Tel: +49 07243/9475800 &nbsp;&nbsp;&nbsp; Fax: +49 07243/9475807
                </Typography>
                <Typography variant="body2" align="center">
                    E-mail: info@3almadmoon.com
                </Typography>
                <Typography variant="body2" align="center">
                    ‍Siemensstraße 23, 76275 Ettlingen, Germany
                </Typography>
                <Typography variant="body2" align="center" style={{ marginTop: '2rem' }}>
                    {'Copyright © '}
                    <Link color='inherit'>
                        3almadmoon
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </div>
        </div>
    ) : <Redirect to='/home' />;
}
 
export default Landing;