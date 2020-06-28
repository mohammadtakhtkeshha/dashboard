import React from 'react';
import '../../App.css';
import Grid from '@material-ui/core/Grid/index';
import {makeStyles} from "@material-ui/core/styles/index";
import {Paper} from '@material-ui/core/index';
import TestComponent from './../TestComponent'


import {
    Switch,
    Route,
} from "react-router-dom";

import * as routes from '../../store/routes'

const useStyles = makeStyles((theme) => ({
    content: {
        boxShadow: '0 0 0 0',
        '@media(min-width : 992px)': {
            marginTop: '64px',
        }
    },
    test: {
        border: '2px solid red',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'flex-end'
    }
}));

function HeaderComponent() {
    const classes = useStyles();
    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <div className={classes.content}>
                        <Switch>
                            {routes.routes.map((route) => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.component}
                                />
                            ))}
                        </Switch>
                    </div>
                </Grid>
            </Grid>
            {/*<div className={classes.test} style={{paddingTop:'60px'}}>*/}
            {/*    this is for test*/}
            {/*    <TestComponent></TestComponent>*/}
            {/*</div>*/}
        </>
    );
}
export default HeaderComponent;



