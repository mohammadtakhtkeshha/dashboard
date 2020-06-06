import Input from "../../partials/inputComponent";
import React from "react";
import Grid from '@material-ui/core/Grid/index';
import {Paper} from '@material-ui/core/index';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({

    paper: {
        border: '1px solid red',
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        '&.MuiPaper-elevation1': {
            boxShadow: '0 0 0 0',
        }
    },
}));

export default function BaseFormComponent() {
    const classes = useStyles();
    return (<>
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <Input type="text" placeholder='ایمیل' label='ساخت ایمیل'
                           small='لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ'/>
                </Paper>
            </Grid>
        </Grid>
    </>);
}
