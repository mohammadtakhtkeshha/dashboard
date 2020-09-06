import React from 'react';
import Grid from '@material-ui/core/Grid/index';
import {Paper} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles/index";
import '../../App.css';

import {
    Switch,
    Route,
} from "react-router-dom";

import {routes} from '../../store/routes'

const useStyles = makeStyles((theme) => ({
    content: {
        boxShadow: '0 0 0 0',
        '@media(min-width : 992px)': {
            marginTop: '64px',
        }
    }
}));

function Index() {
    const classes = useStyles();
    return (
        <>
            <Switch>
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))}
            </Switch>
        </>
    );
}

export default Index;



