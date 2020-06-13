import React , {useContext} from "react";
import SearchIcon from '@material-ui/icons/Search';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import MessageIcon from '@material-ui/icons/Message';
import AddIcon from '@material-ui/icons/Add';
import {Box} from '@material-ui/core/index';
import * as styles from './../../assets/js/LeftWebHeader';
import UserDrawerComponent from "../content/user/partials/UserDrawerComponent";
import AvatarComponent from "../partials/AvatarComponent";
import AppContext from './../../contexts/AppContext'

export default function LeftWebHeaderComponent() {
    const classes = styles.useStyles();
    const appContext= useContext(AppContext);

    let changeDrawerUser = () => {
        appContext.toggleUserDrawer(true);
    };

    return (<>
        <Box display="flex" justifyContent="flex-end" className={classes.leftBlock}>
            <Box className={classes.headerInput}>
                <label htmlFor="" id="label">
                    <SearchIcon fontSize="small"/>
                </label>
                <input type="text" placeholder="جستجو"/>
            </Box>
            <Box className={classes.icons}>
                <AddIcon/>
            </Box>
            <Box className={classes.icons} id="message">
                <Box></Box>
                <MessageIcon/>

            </Box>
            <Box className={classes.icons}>
                <NotificationImportantIcon fontSize="small"/>
            </Box>
            <Box className={classes.avatar}  onClick={changeDrawerUser}>
                <AvatarComponent/>
            </Box>
        </Box>
        <UserDrawerComponent/>
    </>);
}
