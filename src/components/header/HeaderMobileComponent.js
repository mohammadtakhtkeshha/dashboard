import React, {useState} from 'react';
import { Box, Link, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SidebarMobile from '../sidebar/SidebarMobileDrawerComponent';
import {CardMedia} from '@material-ui/core/index';
import Breadcrumbs from '@material-ui/core/Breadcrumbs/index';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import HeaderLeftWeb from './LeftWebHeaderComponent';


//styles of make style
import * as HeaderMobile from './../../assets/js/HeaderMobile';
import clsx from "clsx";
import i18next from "i18next";
import {Route, Switch} from "react-router-dom";
import * as routes from "../../store/routes";
import {StyledPaper} from "../../assets/js/header/rightWebHeader";

export default function HeaderMobileComponent() {
    let lang = i18next.language;
    const [showDrawer, setShowDrawer] = useState(false);
    const [showWebHeader, setshowWebHeader] = useState(false);
    const classes = HeaderMobile.styles();
    let changeDrawer = () => {
        setShowDrawer(false);
    };
    let toggleWebHeader = () => {
        if (showWebHeader) {
            setshowWebHeader(false);
        } else {
            setshowWebHeader(true);
        }
    };
    return (
        <>
            <Box className={classes.mobileHeader}>
                <Box>
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
                <Box className={clsx(classes.buttonBlock,lang==='en'?'leftAuto':'rightAuto')}>
                <button className={clsx('headerButton',lang==='en'?'marginLeft':'marginRight')}
                        onClick={() => setShowDrawer(true)}>
                    <MenuIcon/>
                </button>
                <button className={clsx('headerButton',lang==='en'?'marginLeft':'marginRight')}>
                    <ArrowDownwardIcon onClick={toggleWebHeader}/>
                </button>
                </Box>
                <SidebarMobile changeDrawer={changeDrawer} showDrawer={showDrawer}/>
            </Box>
            {showWebHeader ? <Box className={classes.showWebHeader}>
                <HeaderLeftWeb/>
            </Box> : ''}
        </>
    );
}

