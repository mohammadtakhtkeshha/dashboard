import React from 'react';
import { Toolbar, AppBar} from '@material-ui/core/index';
import {makeStyles} from '@material-ui/core/styles/index';
import RightWebHeader from './RightWebHeader';
import LeftWebHeader from './LeftWebHeader';

import AppContext from './../../contexts/AppContext'


const useStyles = makeStyles((theme) => ({
        root: {
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
            <AppContext.Consumer>
                {context => (
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                   <RightWebHeader/>
                   <LeftWebHeader/>
                </Toolbar>
            </AppBar>
                    )}
        </AppContext.Consumer>
            </>
    );
}

export default HeaderWebComponent;