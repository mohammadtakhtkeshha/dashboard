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
                <CardMedia id="img">
                    <img src={require('../../assets/media/image/favicon.png')} alt="recipe thumbnail"/>
                </CardMedia>
                <Box>
                    <Typography variant="h5">آواتارها</Typography>
                    <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
                        <Link color="inherit" href="#">
                            داشبورد
                        </Link>
                        <Link color="inherit" href="#">
                            فروش و مدیریت مشتری
                        </Link>
                    </Breadcrumbs>
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

