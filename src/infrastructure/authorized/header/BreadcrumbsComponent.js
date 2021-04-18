import React from 'react';
import {withNamespaces} from "react-i18next";

import Breadcrumbs from '@material-ui/core/Breadcrumbs/index';
import {Link, Box} from '@material-ui/core/index';
import {makeStyles} from '@material-ui/core/styles';

import {breadStyles} from "assets/js/library/pages/header/breadcrumbs";

const useStyles = makeStyles(breadStyles);

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

export default withNamespaces('sidebar')(BreadcrumbsComponent);
