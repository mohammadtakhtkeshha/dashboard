import React, {useEffect,useContext } from "react";
import Grid from '@material-ui/core/Grid/index';
import {Paper} from '@material-ui/core/index';
import {makeStyles} from "@material-ui/core/styles";
//notificaiton
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import storage from './../../../libraries/local-storage';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        '&.MuiPaper-elevation1': {
            boxShadow: '0 0 0 0',
        }
    },
}));

export default function BaseFormComponent() {
    const classes = useStyles();
    useEffect(()=>{
        toast(`welcome `);
    },[storage.user]);
    return (<>
        <Grid container>
            <Grid item xs={12} sm={12}>
                <Paper className={classes.paper}>
                    <ToastContainer />
                </Paper>
            </Grid>
        </Grid>
    </>);
}
