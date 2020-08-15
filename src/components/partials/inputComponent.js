import React from 'react';
import makeStyles from "@material-ui/styles/makeStyles/makeStyles";
import {Box, Typography} from '@material-ui/core';
import {globalCss} from "../../assets/js/globalCss";
import clsx from "clsx";

const styles = makeStyles(() => ({
    inputBlock: {
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
        '& label': {
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
            marginBottom: '.5rem',
            '&:focus': {
                borderColor: '#7685fb',
                outline: '0'
            }
        },
        '& small': {
            color: '#a7abc3'
        }
    },
    redBorder: {
        border: '1px solid red!important'
    }
}));

const gClass = makeStyles(globalCss);

function Input({handleClick, label, name, type, border, placeholder, value, small, error, lang}) {
    const gClasses = gClass();
    const classes = styles();
    let handleClickInput = (e, param) => {
        handleClick(e, param);
    };
    return (<>
        <Box className={classes.inputBlock}>
            <label htmlFor="">
                <Typography className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{label}</Typography>
            </label>
            <input
                className={clsx(lang === 'en' ? gClasses.textLeft : gClasses.textRight,(border === 'red' ? classes.redBorder : ''))}
                name={name} type={type} onChange={(e, param) => handleClickInput(e, param)}
                   placeholder={placeholder}
                   value={value}
            />
            {small ? <Typography>{small}</Typography> : ''}
            <Typography>{error}</Typography>

        </Box>
    </>);
}

export default Input;