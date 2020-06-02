import React from 'react';
import { Toolbar, AppBar} from '@material-ui/core/index';
import {makeStyles} from '@material-ui/core/styles/index';

import RightWebHeader from './RightWebHeader';
import LeftWebHeader from './LeftWebHeader';



const useStyles = makeStyles((theme) => ({
        root: {
            border:'1px solid red',
            flexGrow: 1,
        },

        appBar: {
            '&.MuiAppBar-colorPrimary': {
                backgroundColor: '#e7ebee',
                boxShadow: '0 0 0 0',
                padding:'15px 0'
            }
        }
    }))
;

function HeaderWebComponent(props) {
    const classes = useStyles();
    return (
        <>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                   <RightWebHeader/>
                   <LeftWebHeader/>
                </Toolbar>
            </AppBar>

        </>
    );
}

export default HeaderWebComponent;