import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs/index';
import {Link} from '@material-ui/core/index';

export default function BreadcrumbsComponent(props) {
    return (<>
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
                داشبورد
            </Link>
            <Link color="inherit">
                {props.bread}
            </Link>
        </Breadcrumbs>
    </>);
}