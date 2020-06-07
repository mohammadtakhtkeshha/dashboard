import React, {useState} from 'react';
import { Box, Link, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SidebarMobile from './../sidebar/SidebarMobile';
import {CardMedia} from '@material-ui/core/index';
import Breadcrumbs from '@material-ui/core/Breadcrumbs/index';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import HeaderLeftWeb from './LeftWebHeader'

//styles of make style
import * as HeaderMobile from './../../assets/js/HeaderMobile';

export default function HeaderMobileComponent() {
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
                <button style={{marginRight: 'auto'}} className={classes.headerButton}
                        onClick={() => setShowDrawer(true)}>
                    <MenuIcon/>
                </button>
                <button className={classes.headerButton}>
                    <ArrowDownwardIcon onClick={toggleWebHeader}/>
                </button>
                <SidebarMobile changeDrawer={changeDrawer} showDrawer={showDrawer}/>

            </Box>
            {showWebHeader ? <Box className={classes.showWebHeader}>
                <HeaderLeftWeb/>
            </Box> : ''}
        </>
    );
}

