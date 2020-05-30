import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {IconButton, Typography, Button, Input, Toolbar, AppBar, Link, Box} from '@material-ui/core';
import useWindowDimensions from './../main/useWindowDimensions';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Avatar from '@material-ui/core/Avatar';
import avatar from './../assets/media/image/avatar.jpg'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    leftBlock:{
        flexGrow:2,
        textAlign:'left'
    }

}));

function HeaderComponent(props) {
    const classes = useStyles();
    const {width} = useWindowDimensions();

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Box display="flex">
                        <Typography variant="h6" component="h6">داشبورد پشتیبانی</Typography>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" href="/" onClick={handleClick}>
                                داشبورد
                            </Link>
                            <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
                                فروش و مدیریت مشتری
                            </Link>
                        </Breadcrumbs>
                    </Box>
                    <Box display="flex" justifyContent="flex-end" className={classes.leftBlock}>
                        <Input/>
                        <AccessAlarmIcon/>
                        <Avatar alt="Remy Sharp" src={avatar} />
                    </Box>

                    {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
                    {/*    <MenuIcon/>*/}
                    {/*</IconButton>*/}
                    {/*<Typography variant="h6" className={classes.title}>*/}
                    {/*    News*/}
                    {/*</Typography>*/}
                    {/*<Button color="inherit">Login</Button>*/}

                </Toolbar>
            </AppBar>

        </>
    );
}

export default HeaderComponent;