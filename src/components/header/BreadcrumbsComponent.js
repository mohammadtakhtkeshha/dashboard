import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs/index';
import {Link, Box} from '@material-ui/core/index';
import { makeStyles } from '@material-ui/core/styles';

const useStyles=makeStyles({
    breadcrumbs:{
        '& a:hover':{
            textDecoration:'none',

        }
    }
});
export default function BreadcrumbsComponent(props) {
    const classes = useStyles();
    return (<Box className={classes.breadcrumbs}>
        <Breadcrumbs aria-label="breadcrumb" >
            <Link color="inherit" href="/">
                داشبورد
            </Link>
            <Link color="inherit">
                {props.bread}
            </Link>
        </Breadcrumbs>
    </Box>);
}