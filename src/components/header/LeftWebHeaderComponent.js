import React, {useContext} from "react";
import SearchIcon from '@material-ui/icons/Search';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import MessageIcon from '@material-ui/icons/Message';
import {Box} from '@material-ui/core/index';
import * as styles from './../../assets/js/LeftWebHeader';
import UserDrawerComponent from "../content/user/partials/UserDrawerComponent";
import AvatarComponent from "../partials/AvatarComponent.jsx";
import AppContext from './../../contexts/AppContext';
//mulit lang
import {withNamespaces} from 'react-i18next';
import i18n from './../../configs/locales/locales';

//local storage
import storage from './../../libraries/local-storage'

//for two classess in className
import clsx from 'clsx';
import i18next from "i18next";


function LeftWebHeaderComponent({t}) {
    const classes = styles.useStyles();
    const appContext = useContext(AppContext);
    let lang = i18next.language;

    let changeDrawerUser = () => {
        appContext.toggleUserDrawer(true);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        storage.store('lang', lng);
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
            <Box className={clsx( classes.icons,"item")}>
                <button onClick={() => changeLanguage('fa')}>fa</button>
            </Box>
            <Box className={clsx(classes.icons, "item")}>
                <button onClick={() => changeLanguage('en')}>en</button>
            </Box>
            <Box className={clsx(classes.icons, "item")} id="message">
                <Box></Box>
                <MessageIcon/>
            </Box>
            {/*<Box className={clsx(classes.icons, "item")}>*/}
            {/*    <NotificationImportantIcon fontSize="small"/>*/}
            {/*</Box>*/}
            <Box className={clsx(classes.avatar, "item")} onClick={changeDrawerUser}>
                <AvatarComponent/>
            </Box>
        </Box>
        <UserDrawerComponent/>
    </>);
}

export default withNamespaces(['sidebar', 'users', 'translation'])(LeftWebHeaderComponent);
