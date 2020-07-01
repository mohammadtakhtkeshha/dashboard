import React, {useEffect} from "react";
import Grid from '@material-ui/core/Grid/index';
import {Paper} from '@material-ui/core/index';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        '&.MuiPaper-elevation1': {
            boxShadow: '0 0 0 0',
        }
    },
}));

const { addToast } = useToasts();
useEffect(()=>{
    addToast('error.message', { appearance: 'error' })
},[]);
// const App = () => (
//     <ToastProvider>
//         <BaseFormComponent />
//     </ToastProvider>
// )
export default function BaseFormComponent() {
    const classes = useStyles();
    return (<ToastProvider>
        <Grid container>
            <Grid item xs={12} sm={12}>
                <Paper className={classes.paper}>
                    base
                </Paper>
            </Grid>
        </Grid>
    </ToastProvider>);
}
