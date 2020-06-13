import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import {Grid, Paper, Box,Typography} from "@material-ui/core";
import loginImg from './../../../../assets/media/image/login.png';

import inputComponent from './../../../partials/inputComponent'

const useStyles = makeStyles({
    login: {
        width: '100%',
        height: '100vh',
        background: `url(${loginImg})`,
        '& .grid': {
            height:'100vh',
            display: 'flex',
            alignItems:'center',
            justifyContent: 'center',
            '& .paper': {
                display: 'flex',
                justifyContent: 'center',
                width: '50%',
                '& .loginBlock': {
                    textAlign: 'center',
                    '& .title': {
                        fontSize:'17px'
                    },
                },

            }
        },
    },

});
export default function LoginComponent() {
    const classes = useStyles();
    return (<div className={classes.login}>
        <Switch>
            <Route path="/login">
                <Grid container>
                    <Grid item sm className="grid">
                        <Paper className="paper">
                            <Box className="loginBlock">
                                <Typography variant="h5" className="title">
                                    ورود
                                </Typography>
                                <inputComponent type="text" label="نام کاربری"/>
                                <inputComponent type="password" label=""/>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

            </Route>
        </Switch>
    </div>);


}
