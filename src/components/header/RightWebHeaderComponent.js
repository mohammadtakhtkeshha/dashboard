import React from "react";
import {makeStyles} from '@material-ui/core/styles/index';
import {Typography, Box} from '@material-ui/core/index';
import * as routes from '../../store/routes'
import {
    Switch,
    Route,
} from "react-router-dom";

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
}));

export default function RightWebHeaderComponent() {
    const classes = useStyles();
    return (
        <>
            <Box display="flex" flexDirection="column" className={classes.breadcrumbs}>
                <Typography variant="h3" component="h3">داشبورد</Typography>
                <Switch>
                    {routes.routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            exact={route.exact}
                            component={route.breadcrumbs}
                        />
                    ))}
                </Switch>
            </Box>
        </>
    );
}