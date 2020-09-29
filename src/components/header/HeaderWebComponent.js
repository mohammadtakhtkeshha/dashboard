import React from 'react';
import {Toolbar, AppBar} from '@material-ui/core/index';
import {makeStyles} from '@material-ui/core/styles/index';
import RightWebHeaderComponent from './RightWebHeaderComponent';
import LeftWebHeaderComponent from './LeftWebHeaderComponent';

import AppContext from './../../contexts/AppContext'
import {withNamespaces} from "react-i18next";


const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        appBar: {
            position: 'fixed',
            width: 'calc(100% - 230px)',
            zIndex: '49!important',
            '&.MuiAppBar-colorPrimary': {
                backgroundColor: '#e7ebee',
                boxShadow: '0 0 0 0',
            }
        },
        marginLeft: {
            right: '230px',
        },
        marginRight: {
            left: '230px',
        }
    }))
;

function HeaderWebComponent({t}) {
    const classes = useStyles();
    const dir = t('translation:marginDir');
    return (
        <>
            <AppContext.Consumer>
                {context => (
                    <AppBar
                        className={`${classes.appBar} ${dir === 'marginLeft' ? classes.marginLeft : classes.marginRight}`}>
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

export default withNamespaces(['translatino'])(HeaderWebComponent);
