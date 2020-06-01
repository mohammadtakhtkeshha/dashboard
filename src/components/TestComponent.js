import React, {useState, useEffect, useStyle} from 'react';
import {makeStyles} from '@material-ui/core/styles/index';
import {Typography, Button} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SidebarContentComponent from './sidebar/SidebarContentComponent';
import SidebarMobile from './sidebar/SidebarMobile'

const useStyles = makeStyles((theme) => ({
    show: {
        width: '100%',
    },
    notShow: {
        width: '0'
    }
}));

function TestComponent(props) {
    const [showDrawer, setShowDrawer] = useState(false);
    const classes = useStyles(useStyles);
    let changeDrawer = () => {
        setShowDrawer(false);
    };

    return (
        <>
            <button>TEST</button>
            <Button onClick={() => setShowDrawer(true)}>
                <MenuIcon/>
            </Button>
            <SidebarMobile changeDrawer={changeDrawer} className={showDrawer ? classes.show : classes.notShow}/>
        </>
    );
}

export default TestComponent;