import React, {useState, useEffect} from "react";
import {Box,Typography,Grid,Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import axios from "axios/index";
import * as colors from './../../../partials/Colors'


const useStyles = makeStyles((theme) => (
    {
        paper:{
            padding:theme.spacing(2),
            margin:theme.spacing(2),
        }
    }
));

export default function CommentsChartComponent() {
    const classes = useStyles();

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        content dashboard
                    </Paper>
                </Grid>
            </Grid>
        </>
    );

}
