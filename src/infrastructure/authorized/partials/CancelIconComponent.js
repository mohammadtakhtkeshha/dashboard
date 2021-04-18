import React from "react";
import {makeStyles} from "@material-ui/styles";
import {ReactComponent as Lo} from "./cancel-svgrepo-com(2).svg";
import styled from "styled-components";

const useStyles = makeStyles({
    root: {
        '& svg': {
            fill: 'blue'
        }
    }
});

const StyledSvg = styled.svg`
    fill:green;
`



export default function CancelIconComponent() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Lo width={"40px"} height={"40px"} style={{color:'red'}}/>
        </div>
    );

}
