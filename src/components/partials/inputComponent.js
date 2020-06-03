import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField,Box} from '@material-ui/core';

const styles = makeStyles((theme) => ({
    textField: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500,
        // border:'1px solid blue',
        // '&.MuiFormControl-root':{
        //     border:'1px solid blue'
        // },
        // '&.MuiTextField-root':{
        //     border:'1px solid red'
        // },
        // '&.makeStyles-textField-9':{
        //     border:'1px solid green'
        // },
        // '&.MuiFormControl-marginNormal':{
        //     border:'1px solid black'
        // },
        '& .MuiInputBase-root::after':{
            border:'0'
        },
        '& .MuiInputBase-root::before':{
            border:'0'
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before':{
            border:'0'
        },
        '& .MuiInputLabel-animated':{
            transition:'none'
        },
        '& .MuiInputLabel-formControl':{
            // transform:
        },

    },
    input: {
        color: 'red',
        direction:'ltr',
    }
}));
export default function BasicTextFields() {
    const classes = styles();
    const [form,setForm]=useState();
    let handle_change=()=>{
        console.log();
    };

    return (

        <span>
           <TextField
               id="email"
               label="Email"
               className={classes.textField}
               value={form}
               onChange={handle_change('form')}
               margin="normal"
               InputProps={{
                   className: classes.input,
               }}

           />
        </span>
    );
}