import React from "react";
import {Box, Paper} from '@material-ui/core/index';
import {makeStyles} from "@material-ui/core/styles/index";


const useStyles = makeStyles((theme) => ({

}));

export default function BaseFormComponent() {
    const classes = useStyles();
    return (<>
        <Box>
            <Paper className={classes.paper}>
                contents component
            </Paper>
        </Box>
    </>);
}
