import React, {useEffect} from "react";
import {Box, Button, Paper} from '@material-ui/core/index';

import {makeStyles} from "@material-ui/core/styles/index";

const useStyles = makeStyles((theme) => ({

}));

export default function BaseFormComponent() {
    const classes = useStyles();
    function register(){
        debugger;
    }
    return (<>
        <Box>
            <Paper className={classes.paper}>
                comments component
            </Paper>
        </Box>
    </>);
}
