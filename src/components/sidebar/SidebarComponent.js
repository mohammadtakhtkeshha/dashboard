import React from 'react';
import {makeStyles} from '@material-ui/core/styles/index';
import {Paper, Typography} from '@material-ui/core/index';
import {CardMedia} from '@material-ui/core/index';
import SidebarContent from './SidebarContentComponent';
import {Link} from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";


const useStyles = makeStyles((theme) => ({
    img: {
        textAlign: 'center',
        margin: 'auto',
        paddingTop: '20px'
    },
    nextable: {
        width: 'auto',
        height: '47px',
        marginTop: '30px'
    },
    mypaper:{
        borderRadius:'0!important'
    }
}));

export default function SimpleTabs() {

const classes=useStyles();

    return (
        <>
            <Paper className={classes.mypaper}>
                <Typography variant="h6" className={classes.img}>
                    <Link to="/">
                        <CardMedia>
                            <img src={require('../../assets/media/image/logo.png')} alt="recipe thumbnail"/>
                        </CardMedia>
                    </Link>
                </Typography>
            </Paper>
            <SidebarContent/>
        </>
    );
}