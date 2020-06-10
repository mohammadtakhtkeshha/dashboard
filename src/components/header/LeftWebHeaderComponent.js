import React , {useState} from "react";
import avatar from '../../assets/media/image/avatar.jpg';
import SearchIcon from '@material-ui/icons/Search';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import MessageIcon from '@material-ui/icons/Message';
import AddIcon from '@material-ui/icons/Add';
import {Box} from '@material-ui/core/index';
import * as styles from './../../assets/js/LeftWebHeader';
import UserDrawerComponent from "../content/user/partials/UserDrawerComponent";
import AvatarComponent from "../partials/AvatarComponent";


export default function LeftWebHeaderComponent() {
    const classes = styles.useStyles();
    const [showUserDrawer , setShowUserDrawer] = useState(false);
    let changeDrawerUser = () => {
        setShowUserDrawer(false);
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
            <Box className={classes.avatar}  onClick={()=>{setShowUserDrawer(true)}}>
                <AvatarComponent/>
            </Box>
        </Box>
        <UserDrawerComponent changeDrawerUser={changeDrawerUser} showDrawer={showUserDrawer}/>
    </>);
}
