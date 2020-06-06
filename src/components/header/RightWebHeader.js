import React  from "react";
import {makeStyles} from '@material-ui/core/styles/index';
import {Typography, Link, Box} from '@material-ui/core/index';
import Breadcrumbs from '@material-ui/core/Breadcrumbs/index';

const useStyles = makeStyles((theme) => ({
        breadcrumbs: {
            '& h3': {
                fontSize: '23px',
                lineHeight: '32px',
                fontWeight: '700',
                color: 'black'
            },
            '& li:nth-of-type(1)': {
                color: 'black',
            },
            '& li:nth-of-type(3)': {
                color: '#5867dd',
            },
        }
    }))
;

export default function RightWebHeader() {
    const classes = useStyles();

    return (<>
        <Box display="flex" flexDirection="column" className={classes.breadcrumbs}>
            <Typography variant="h3" component="h3">داشبورد</Typography>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/">
                    داشبورد
                </Link>
                <Link color="inherit" href="/getting-started/installation/">
                    فروش و مدیریت مشتری
                </Link>
            </Breadcrumbs>
        </Box>
    </>);
}