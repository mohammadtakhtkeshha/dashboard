import React from 'react';
import makeStyles from "@material-ui/styles/makeStyles/makeStyles";
import {Box} from '@material-ui/core'

const styles = makeStyles(() => ({
    inputBlock:{
        marginBottom: '1rem',
        display: 'flex',
        flexDirection : 'column',
        '& label':{
            marginBottom: '.5rem',
        },
        '& input': {
            display: 'block',
            height: 'calc(1.25rem + 2px)',
            padding: '.375rem .75rem',
            fontSize: '1rem',
            fontWeight: '400',
            lineHeight: '1.5',
            color: '#495057',
            backgroundColor: '#fff',
            backgroundClip: 'padding-box',
            border: '1px solid #ced4da',
            borderRadius: '.25rem',
            transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
            marginBottom : '.5rem',
            '&:focus':{
                borderColor: '#7685fb',
                outline: '0'
            }
        },
        '& small':{
            color:'#a7abc3'
        }
    }

}));

function Input(props) {
    const classes = styles();
    return (<>
        <Box className={classes.inputBlock}>
            <label htmlFor="">{props.label}</label>
            <input type={props.type} className={classes.input} title="n" placeholder={props.placeholder}/>
            {props.small?   <small>{props.small}</small> : ''}

        </Box>
    </>);
}

export default Input;