import React, {createRef, useContext, useState} from "react";
import * as styles from 'assets/js/LeftWebHeader';
import {FormControl,NativeSelect} from "@material-ui/core";
import clsx from 'clsx';
import i18next from "i18next";

import SearchIcon from '@material-ui/icons/Search';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { CardMedia } from '@material-ui/core';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import MessageIcon from '@material-ui/icons/Message';
import {Box} from '@material-ui/core/index';
import UserDrawerComponent from "../content/user/partials/UserDrawerComponent";

import AppContext from 'contexts/AppContext';
import {withNamespaces} from 'react-i18next';
import i18n from 'configs/locales/locales';
import storage from 'libraries/local-storage';
import {StyledPowerBox,StyledBoxItem} from "assets/js/header/leftWebHeader";
import Iran from '../../assets/media/image/iran.png';
import Us from '../../assets/media/image/us.jpg';

function LeftWebHeaderComponent({t}) {
    const classes = styles.useStyles();
    const appContext = useContext(AppContext);
    const ref=createRef();
    const lang = i18next.language;
    const [country,setCountry]=useState('');
    const changeDrawerUser = () => {
        appContext.toggleUserDrawer(true);
    };

    const changeLanguage = (lng) => {debugger
        const currentLang=lng.currentTarget.value;
        setCountry(currentLang);
    };

    return (<>
        <Box className={classes.leftBlock}>
            <Box className={clsx(classes.headerInput, "item")}>
                <label htmlFor="" id="label"
                       className={clsx(lang === 'fa' ? classes.leftInputLabel : classes.rightInputLabel)}>
                    <SearchIcon fontSize="small"/>
                </label>
                <input type="text" placeholder={t('translation:search')}/>
            </Box>
            {/*<Box className={clsx( classes.icons,"item")}>*/}
            {/*    <button onClick={() => changeLanguage('fa')}>fa</button>*/}
            {/*</Box>*/}
            <Box>
                {/*<button onClick={() => changeLanguage('en')}>*/}
                {/*    <KeyboardArrowDownIcon/>*/}
                {/*    <Box>*/}
                {/*        <CardMedia*/}
                {/*            image={require('../../assets/media/image/iran.png')}*/}
                {/*            style={{width:'20px',height:'20px', borderRadius: '100%'}}*/}
                {/*        />*/}
                {/*    </Box>*/}
                {/*</button>*/}
            </Box>
            <Box>
                <FormControl className={classes.formControl}>
                    <NativeSelect
                        value={country}
                        onChange={changeLanguage}
                        name="age"
                        inputProps={{ 'aria-label': 'age' }}
                    >
                        <option value='en' style={{background:`url(${Iran}) center center no-repeat`,
                            width:'10px',
                            height:'10px',
                            position: 'relative',
                            top:'0',
                            left:'0',
                            zIndex:'1000',
                            backgroundColor:'#fff'}}
                        ref='option'
                        >
                        {/*    <CardMedia*/}
                        {/*    image={require('../../assets/media/image/us.jpg')}*/}
                        {/*    style={{width:'20px',height:'20px', borderRadius: '100%'}}*/}
                        {/*/>*/}
                        {/*    <img src="../../assets/media/image/us.jpg" alt="a"/>*/}
                        en
                        </option>
                        <option value='fa'>
                        {/*    <CardMedia*/}
                        {/*    image={require('../../assets/media/image/iran.png')}*/}
                        {/*    style={{width:'20px',height:'20px', borderRadius: '100%'}}*/}
                        {/*/>*/}
                        fa
                        </option>
                    </NativeSelect>
                </FormControl>
            </Box>
            <Box className={clsx(classes.icons, "item")} id="message">
                <Box></Box>
                <MessageIcon/>
            </Box>
            <Box className={clsx(classes.icons, "item")}>
                <NotificationImportantIcon fontSize="small"/>
            </Box>
            <StyledBoxItem>
                <button>
                <NotificationImportantIcon fontSize="small"/>
                </button>
            </StyledBoxItem>

            <StyledPowerBox>
                <PowerSettingsNewIcon/>
            </StyledPowerBox>
            {/*<Box className={clsx(classes.avatar, "item")} onClick={changeDrawerUser}>*/}
            {/*    <AvatarComponent/>*/}
            {/*</Box>*/}
        </Box>
        <UserDrawerComponent/>
    </>);
}

export default withNamespaces(['sidebar', 'users', 'translation'])(LeftWebHeaderComponent);
