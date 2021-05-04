import SidebarContentComponent from "./SidebarContentComponent"
import React, {useEffect, useRef , useCallback} from "react"

import {Box} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles/index';

import {styles} from 'assets/js/SidebarMobile'

export default function (props) {
    const node = useRef()
    const classes = makeStyles(styles)

    const handleClick = useCallback((e)=> {
        if (!node.current.contains(e.target)) {
            props.changeDrawer()
        }
    },[props])

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick)  // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    }, [handleClick])

    return (
        <>
            <Box className={props.showDrawer ? classes.show : classes.notShow}>
                <Box id="openedSidebar" ref={node}>
                    <SidebarContentComponent/>
                </Box>
            </Box>
        </>
    )
}
