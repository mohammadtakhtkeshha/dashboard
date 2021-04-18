import React, {useState} from 'react';
import clsx from "clsx";
import {Route, Switch} from "react-router-dom";

import { Box} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core/styles/index';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import SidebarMobile from '../sidebar/SidebarMobileDrawerComponent';
import HeaderLeftWeb from './LeftWebHeaderComponent';
import {styles} from 'assets/js/HeaderMobile';
import i18next from "i18next";
import * as routes from "store/routes";

export default function HeaderMobileComponent() {
    let lang = i18next.language;
    const [showDrawer, setShowDrawer] = useState(false);
    const [showWebHeader, setshowWebHeader] = useState(false);
    const classes = makeStyles(styles);

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

