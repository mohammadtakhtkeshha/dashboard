import React from 'react';
import {Link} from "react-router-dom";

import {Typography} from '@material-ui/core/index';
import {CardMedia} from '@material-ui/core/index';

import SidebarContent from './SidebarContentComponent';
import {StyledPaper} from 'assets/js/sidebar/sidebar';

export default function Index() {

    return (<StyledPaper>
        <Typography variant="h6">
            <Link to="/">
                <CardMedia>
                    <img src={require('assets/media/image/logo.png')} alt="recipe thumbnail"/>
                </CardMedia>
            </Link>
        </Typography>
        <SidebarContent/>
    </StyledPaper>);
}
