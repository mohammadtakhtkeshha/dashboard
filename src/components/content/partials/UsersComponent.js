import React , {useEffect} from "react";
import Grid from '@material-ui/core/Grid/index';
import {Paper} from '@material-ui/core/index';
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios"


// const useStyles = makeStyles((theme) => ({
//
// }));

export default function BaseFormComponent() {
    // const classes = useStyles();
    useEffect(()=>{
        axios.get('http://sitesaz99.rbp/web/api/user/v1?_format=json').then(
            function(response){
                    console.log(response);
                    debugger
            }
        ).catch(function(error){
            console.log(error);
        });
    });
    return (<>
        <Grid container>
            <Grid item xs={6} sm={6}>
                <Paper >
                  کاربران
                </Paper>
            </Grid>
        </Grid>
    </>);
}
