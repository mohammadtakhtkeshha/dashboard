import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs/index';
import {Link, Box} from '@material-ui/core/index';
import {makeStyles} from '@material-ui/core/styles';
import {withNamespaces} from "react-i18next";
import {green,white} from "./../partials/Colors";

const useStyles = makeStyles({
    breadcrumbs: {
        '& a:hover': {
            textDecoration: 'none',

        },
        '& li:last-child': {
            '& a': {
                    color: white[0],
            }
        },
        '& li': {
            '& a': {
                    color: green[7],
            },
            color: green[7],
        }
    }
});

function BreadcrumbsComponent({t, bread}) {
    const classes = useStyles();
    return (<Box className={classes.breadcrumbs}>
        <Breadcrumbs aria-label="breadcrumb">
            <Link color='inherit' href="/">
                {t('sidebar:dashboard')}
            </Link>
            <Link>
                {t(`sidebar:${bread}`)}
            </Link>
        </Breadcrumbs>
    </Box>);
}

export default withNamespaces(['sidebar'])(BreadcrumbsComponent);