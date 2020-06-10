import React from 'react';
import {Toolbar, AppBar} from '@material-ui/core/index';
import {makeStyles} from '@material-ui/core/styles/index';
import RightWebHeaderComponent from './RightWebHeaderComponent';
import LeftWebHeaderComponent from './LeftWebHeaderComponent';

import AppContext from './../../contexts/AppContext'


const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },

        appBar: {
            position: 'fixed',
            width: 'calc(100% - 300px)',
            marginLeft: 'auto',
            right: '300px',
            '&.MuiAppBar-colorPrimary': {
                backgroundColor: '#e7ebee',
                boxShadow: '0 0 0 0',
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
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <RightWebHeaderComponent/>
                            <LeftWebHeaderComponent/>
                        </Toolbar>
                    </AppBar>
                )}
            </AppContext.Consumer>
        </>
    );
}

export default HeaderWebComponent;