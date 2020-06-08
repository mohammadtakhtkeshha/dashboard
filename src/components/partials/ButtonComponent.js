import React from 'react';
import {Button} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles/index";


const useClass =makeStyles(()=>({
    button:{
        padding:'5px 8px',
        marginLeft :'2px',
        '& .MuiButton-startIcon':{//icon
            marginLeft:'1px',
            marginRight:'0',
        }
    }
}));

export default function ButtonComponent(props) {
    const classes = useClass();
    return (
        <Button
            variant="contained"
            color={props.color}
            className={classes.button}
            startIcon={props.startIcon}
            endIcon={props.endIcon}
        >
            {props.text}
        </Button>);
}