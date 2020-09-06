import React from 'react';
import clsx from "clsx";
import i18next from "i18next";

import makeStyles from "@material-ui/styles/makeStyles/makeStyles";
import {Box, Typography} from '@material-ui/core';

import {globalCss} from "assets/js/globalCss";
import {inputSytle} from "assets/js/partials/input";

const styles = makeStyles(inputSytle);
const gClass = makeStyles(globalCss);

function Input({handleClick, label, name, type, border, placeholder, value, small, error}) {
    let lang = i18next.language;
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
