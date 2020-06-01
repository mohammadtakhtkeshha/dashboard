import React from 'react';
import {makeStyles} from '@material-ui/core/styles/index';
import {Paper, Typography, Link} from '@material-ui/core/index';
import {CardMedia} from '@material-ui/core/index';
import SidebarContent from './SidebarContentComponent';


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
}));

export default function SimpleTabs() {

const classes=useStyles();
    return (
        <>
            <Paper>
                <Typography variant="h6" className={classes.img}>
                    <Link>
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