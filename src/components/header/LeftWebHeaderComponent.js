import React , {useContext} from "react";
import SearchIcon from '@material-ui/icons/Search';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import MessageIcon from '@material-ui/icons/Message';
import AddIcon from '@material-ui/icons/Add';
import {Box} from '@material-ui/core/index';
import * as styles from './../../assets/js/LeftWebHeader';
import UserDrawerComponent from "../content/user/partials/UserDrawerComponent";
import AvatarComponent from "../partials/AvatarComponent";
import AppContext from './../../contexts/AppContext';
//mulit lang
import { withNamespaces } from 'react-i18next';
import i18n from  './../../configs/locales/locales';

//local storage
import storage from './../../libraries/local-storage'

function LeftWebHeaderComponent({t}) {
    const classes = styles.useStyles();
    const appContext= useContext(AppContext);
    let lang=storage.get('lang');

    let changeDrawerUser = () => {
        appContext.toggleUserDrawer(true);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        storage.store('lang',lng);
    };


    return (<>
        <Box className={classes.leftBlock}>
            <button onClick={() => changeLanguage('fa')}>fa</button>
            <button onClick={() => changeLanguage('en')}>en</button>
            <Box className={[classes.headerInput,"item"]}>
                <label htmlFor="" id="label" className={lang==='fa'?classes.leftInputLabel:classes.rightInputLabel}>
                    <SearchIcon fontSize="small"/>
                </label>
                <input type="text" placeholder={t('translation:search')}/>
            </Box>
            <Box className={[classes.icons ,"item"]}>
                <AddIcon/>
            </Box>
            <Box className={ [classes.icons ,"item"]} id="message">
                <Box></Box>
                <MessageIcon/>
            </Box>
            <Box className={ [classes.icons ,"item"]}>
                <NotificationImportantIcon fontSize="small"/>
            </Box>
            <Box className={ [classes.avatar ,"item"]}  onClick={changeDrawerUser}>
                <AvatarComponent/>
            </Box>
        </Box>
        <UserDrawerComponent/>
    </>);
}
export default withNamespaces(['sidebar','users','translation'])(LeftWebHeaderComponent);
