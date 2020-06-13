import React from 'react';
import {Button} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles/index";


const useClass =makeStyles(()=>({
    button:props=>({
        padding:'5px 8px',
        marginLeft :'2px',
        color:props.color,
        fontSize :'14px',
        backgroundColor :props.background,
        '& .MuiButton-startIcon':{//icon
            marginLeft:'1px',
            marginRight:'0',
        }
    })
}));

export default function ButtonComponent(props) {
    const classes = useClass(props);
    // function clicked() {
    //     props.clicked();
    // }
    return (
        <Button
            // onClick={clicked}
            variant="contained"
            color={props.color}
            className={classes.button}
            startIcon={props.startIcon}
            endIcon={props.endIcon}
            background={props.background}
            color={props.color}
        >
            {props.text}
        </Button>);
}