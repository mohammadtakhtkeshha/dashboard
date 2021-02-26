import React , {useContext} from 'react';
import {withNamespaces} from "react-i18next";

import { Link } from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles/index';
import {Box, Typography} from "@material-ui/core/index";
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';

import storage from 'libraries/local-storage';
import UserDrawerContentStyle from "assets/js/user/UserDrawerContent";
import AvatarComponent from "components/partials/AvatarComponent.jsx";
import AppContext from "contexts/AppContext";
import {green} from "components/partials/Colors";

const useStyles = makeStyles(UserDrawerContentStyle);

function UserDrawerContentComponent({t}) {
    const classes = useStyles();
    const appContext = useContext(AppContext);
    const currentUser = JSON.parse(storage.get('user'));

    let changeUserDrawer = () => {
        appContext.toggleUserDrawer(false);
    };

    return (
    <>
        <Box className={classes.content}>
            <Box className="item avatar">
                <AvatarComponent width="4.8rem" height="4.8rem" style={{justifyContent: 'center'}}/>
                <Typography variant="h4" id="name">{currentUser !== null ? currentUser.field_name : ''}</Typography>
                <Typography variant="h4" id="name">{currentUser !== null ? currentUser.field_last_name:''}</Typography>
                <Box id="nameBlock">
                    <SettingsIcon id="setting"/>
                    <Typography className="role" variant='h5'>
                        {currentUser !==null && currentUser.roles !== undefined ?currentUser.name:''}
                    </Typography>
                </Box>
                <Box id="roleBlock">
                    <Typography className="role" variant="h6">{t('users:role')}</Typography>
                    <Typography className="role" variant='h5'>
                        {currentUser !== null && currentUser.roles !== undefined && currentUser.roles.length>0 ?currentUser.roles.toString():''}
                    </Typography>
                </Box>
                <Typography variant="h4" id="username">{currentUser !== null && currentUser.name}</Typography>
                <Typography variant="h3" id="email">{currentUser !== null && currentUser.mail}</Typography>
            </Box>
            <Box className="buttons">
                <Link className="link" to="/comments" onClick={changeUserDrawer}>
                    <button className="button" color={green[0]}>
                        مشاهده کامنت ها<EditIcon/>
                    </button>
                </Link>
                <Link className="link" to="/contents" onClick={changeUserDrawer}>
                    <button
                        className="button" color="secondary">
                        مشاهده محتوا ها <EditIcon/>
                    </button>
                </Link>
                <Link className="link" to="/edit-user"
                      onClick={changeUserDrawer}
                >
                    <button className="button">
                        ویرایش پروفایل
                    </button>
                </Link>
            </Box>
        </Box>
    </>);
}

export default withNamespaces('users')(UserDrawerContentComponent);
