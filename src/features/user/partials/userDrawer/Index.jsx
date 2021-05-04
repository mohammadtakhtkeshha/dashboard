import React, {useEffect, useRef, useCallback} from "react"
import clsx from "clsx"
import i18next from "i18next"

import {makeStyles} from '@material-ui/core/styles/index'
import {Box} from '@material-ui/core/index'

import ProfileContentComponent from "./partials/UserDrawerContent.jsx"
import AppContext from "contexts/AppContext"
import {currentStyles} from "assets/js/library/pages/user/profile"

const styles = makeStyles(currentStyles)

export default function () {
    const node = useRef()
    const classes = styles()
    const appContext = React.useContext(AppContext)
    let lang = i18next.language

    const handleClick = useCallback((e) => {
        if (!node.current.contains(e.target)) {
            appContext.toggleUserDrawer(false)
        }
    }, [appContext])

    useEffect(() => {
        document.addEventListener("mousedown", handleClick)
        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    }, [handleClick])

    return (<Box className={clsx((appContext.showUserDrawer ? classes.show : classes.notShow), (lang === 'fa' ? classes.dirLeft : classes.dirRight))}>
        <Box id="openedSidebar" ref={node} className={classes.openedSidebar}>
            <ProfileContentComponent changeUserDrawer={handleClick}/>
        </Box>
    </Box>)
}
