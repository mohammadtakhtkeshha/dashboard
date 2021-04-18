import React from "react";
import Grid from '@material-ui/core/Grid/index';
import {Paper} from '@material-ui/core/index';
import {makeStyles} from "@material-ui/core/styles";
import {StyledInput} from "assets/js/App";


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
}));

export default function BaseFormComponent() {
    const classes = useStyles();
    return (<>
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <StyledInput type="text" placeholder='نام کاربری' label='نام کاربری خود را وارد کنید'
                           small=''/>
                    <StyledInput type="password" placeholder='رمز عبور' label='رمز عبور خود را وارد کنید'
                           small=''/>
                </Paper>
            </Grid>
        </Grid>
    </>);
}
