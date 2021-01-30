import UserDrawerContentComponent from "./UserDrawerContentComponent";
import React, {useEffect, useRef, useCallback} from "react";
import {makeStyles} from '@material-ui/core/styles/index';
import {Box} from '@material-ui/core/index'
import AppContext from "contexts/AppContext";
import storage from 'libraries/local-storage'
import clsx from "clsx";
import i18next from "i18next";

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
        direction: (storage.get('lang') === 'fa' ? 'ltr' : 'rtl'),
        marginTop: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 50,
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
        zIndex: 50,
        overflow: 'hidden',

    },
    dirLeft:{
        direction:'ltr'
    },
    dirRight:{
        direction:'rtl'
    }
}));
export default function (props) {
    const node = useRef();
    const classes = styles();
    const appContext = React.useContext(AppContext);
    let lang=i18next.language;

    const handleClick = useCallback((e) => {
        if (!node.current.contains(e.target)) {
            // props.changeDrawerUser();
            appContext.toggleUserDrawer(false);
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
            <Box className={clsx((appContext.showUserDrawer ? classes.show : classes.notShow),(lang==='fa'?classes.dirLeft:classes.dirRight))}>
                <Box  id="openedSidebar" ref={node} className={classes.openedSidebar}>
                    <UserDrawerContentComponent changeUserDrawer={handleClick}/>
                </Box>
            </Box>
        </>
    );
}
