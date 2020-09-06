import React from 'react';
import {Button , Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles/index";
import {primary} from "./Colors";

const useClass =makeStyles(()=>({
    button:props=>({
        padding:'5px 8px',
        marginLeft :'2px',
        textTransform:'unset !important',
        color:props.color,
        fontSize :'14px',
        backgroundColor :props.background,
        '&:hover':{
            backgroundColor :props.background,
        },
        '& .MuiButton-startIcon':{//icon
            marginLeft:'1px',
            marginRight:'0',
        }
    })
}));

export default function ButtonComponent(props) {
    const classes = useClass(props);
    function clicked(e) {
        props.clicked(e);
    }
    function doNothing(e) {

    }

    return (
        <Button
            onClick={props.clicked?clicked:doNothing}
            variant="contained"
            color={props.color}
            className={classes.button}
            startIcon={props.startIcon}
            endIcon={props.endIcon}
            background={props.background}
            value={props.value}
        >
            <Typography>{props.text}</Typography>
        </Button>);
}
