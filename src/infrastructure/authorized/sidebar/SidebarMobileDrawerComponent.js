import React, {useEffect, useRef, useCallback} from "react"
import SidebarContentComponent from "./SidebarContentComponent"

import {StyledSidebarMobile, StyledSidebar} from 'assets/js/SidebarMobile'

export default function (props) {
    const {showDrawer, closeDrawer} = props
    const node = useRef()

    const handleClick = useCallback((e) => {
        if (!node.current.contains(e.target)) {
            closeDrawer()
        }
    }, [closeDrawer])

    useEffect(() => {
        document.addEventListener("mousedown", handleClick)  // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    }, [handleClick])

    return (<StyledSidebarMobile show={showDrawer}>
            <StyledSidebar show={showDrawer} ref={node}>
                <SidebarContentComponent/>
            </StyledSidebar>
        </StyledSidebarMobile>)
}
