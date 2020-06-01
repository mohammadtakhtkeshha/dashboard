import SidebarContentComponent from "./SidebarContentComponent";
import React, {useEffect, useRef} from "react";
import {makeStyles} from '@material-ui/core/styles/index';


const useStyles = makeStyles((theme) => ({
    openedSidebar: {
        marginTop: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1000000000,
        left: 0,
        overflow: 'hidden',
        '& #openedSidebar': {
            width: '40%',
            backgroundColor: 'white',
            '& #myheader': {
                height: '100vh'
            }
        },

    }
}));

export default function (props) {
    const node = useRef();
    console.log(node);
    const classes = useStyles(useStyles);
    const handleClick = e => {
        if (!node.current.contains(e.target)) {
            props.changeDrawer();
        }
    };
    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);  // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    return (
        <>
            <div className={classes.openedSidebar} >
                <div id="openedSidebar" ref={node} style={{border:'1px solid red'}}  >
                    <SidebarContentComponent/>
                </div>
            </div>
        </>
    );
}