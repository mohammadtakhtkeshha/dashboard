import UserDrawerContentComponent from "./UserDrawerContentComponent";
import React, {useEffect, useRef, useCallback} from "react";
import {makeStyles} from '@material-ui/core/styles/index';
import {Box} from '@material-ui/core/index'
//import styles from make style
// import * as useStyle from './../../../assets/js/SidebarMobile.js'

export const styles = makeStyles((theme) => ({
    openedSidebar: {
        display: 'inline-block',
        backgroundColor: 'white',
        height: '100%'
    },
    show: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        direction: 'ltr',
        marginTop: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 90000000000000,
        overflow: 'hidden',
    },
    notShow: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: 0,
        height: '100vh',
        direction: 'ltr',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 8000000000000,
        overflow: 'hidden',

    }
}));

export default function (props) {
    const node = useRef();
    const classes = styles();
    const handleClick = useCallback((e) => {
        if (!node.current.contains(e.target)) {
            props.changeDrawerUser();
        }
    }, []);

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);  // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [handleClick]);

    return (
        <>
            <Box className={props.showDrawer ? classes.show : classes.notShow}>
                <Box id="openedSidebar" ref={node} className={classes.openedSidebar}>
                    <UserDrawerContentComponent/>
                </Box>
            </Box>
        </>
    );
}