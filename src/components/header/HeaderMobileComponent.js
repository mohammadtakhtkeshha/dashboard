import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles/index';
import { Box, Link, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SidebarMobile from './../sidebar/SidebarMobile';
import {CardMedia} from '@material-ui/core/index';
import Breadcrumbs from '@material-ui/core/Breadcrumbs/index';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import HeaderLeftWeb from './LeftWebHeader'

const styles = makeStyles((theme) => ({
    mobileHeader: {
        paddingBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        '& #img': {
            paddingLeft: '10px',
        },

    },
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

    },
    headerButton: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '18px',
        width: '40px',
        height: '35px',
        borderRadius: '5px',
        backgroundColor: 'white',
        marginRight: '12px',
        border: '0',
        color: '#5867dd',
        '&:hover': {
            cursor: 'pointer'
        },
        '&:focus': {
            outline: '0',
        },
    },
    showWebHeader: {
        backgroundColor: '#f5f5f5',
        padding: '10px 10px',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        border: '1px solid #e1e1e1',
        '& input':{
            display:'none'
        },
        '& label':{
            display:'none'
        },
    }
}));

function HeaderMobileComponent() {
    const [showDrawer, setShowDrawer] = useState(false);
    const [showWebHeader, setshowWebHeader] = useState(false);
    // const matches = useMediaQuery('(min-width:600px)');
    const classes = styles();
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

export default HeaderMobileComponent;