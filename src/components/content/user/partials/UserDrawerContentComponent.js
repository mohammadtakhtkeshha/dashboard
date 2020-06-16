import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles/index';
import {Box, Typography} from "@material-ui/core/index";
import SettingsIcon from '@material-ui/icons/Settings';
import * as colors from '../../../partials/Colors.js';
import EditIcon from '@material-ui/icons/Edit';
import {
    Link
} from "react-router-dom";


import AvatarComponent from "../../../partials/AvatarComponent";
import ButtonComponent from "../../../partials/ButtonComponent";
import AppContext from "../../../../contexts/AppContext";


const useStyles = makeStyles((theme) => ({
    content: {
        color: 'black',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        overflow: 'scroll',
        alignItems: 'center',
        '& .avatar': {
            borderBottom: `1px solid ${colors.grey.veryLight}`,
            '& > :first-child': {
                justifyContent: 'center!important',
            },
            textAlign: 'center',
            '& #name': {
                color: colors.primary,
                fontSize: '20px',
                paddingTop: theme.spacing(3),
            },
            '& #email': {
                color: colors.primary,
                fontSize: '14px',
                paddingTop: theme.spacing(1),
                paddingBottom: theme.spacing(2),
            },
            '& #username': {
                color: colors.primary,
                fontSize: '20px',
                paddingTop: theme.spacing(1),
            },

            '& #roleBlock': {
                display: 'flex',
                justifyContent: 'center',
                paddingTop: theme.spacing(2),
                '& #role': {
                    color: colors.grey.light,
                    fontSize: '14px',
                    paddingLeft: '5px',
                },
                '& #setting': {
                    color: colors.darkBlue,
                    fontSize: '14px',
                    paddingTop: '2px',
                    height: '20px',
                },
            },

        },

        '& .buttons': {
            padding: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
            '& .link': {
                margin: theme.spacing(1),
                textDecoration: 'none',
                display: 'block',
                '& button': {
                    margin: theme.spacing(1),
                    width: '100%',
                },
            },


        },
    }

}));


export default function UserDrawerContentComponent(props) {
    const classes = useStyles();
    const appContext= React.useContext(AppContext);

    let changeUserDrawer = () => {
        appContext.toggleUserDrawer(false);
    };
    return (<>
        <Box className={classes.content}>
            <Box className="item avatar">
                <AvatarComponent width="4.8rem" height="4.8rem" style={{justifyContent: 'center'}}/>
                <Typography variant="h4" id="name">{appContext.user.field_name}</Typography>
                <Typography variant="h4" id="name">{appContext.user.field_last_name}</Typography>
                <Box id="roleBlock">
                    <SettingsIcon id="setting"/>
                    <span id="role">رهبر تیم</span>
                </Box>
                <Typography variant="h4" id="username">{appContext.user.name}</Typography>
                <Typography variant="h3" id="email">{appContext.user.mail}</Typography>
            </Box>
            <Box className="buttons">
                <Link className="link" to="/comments" onClick={changeUserDrawer}>
                    <ButtonComponent className="button" text="مشاهده کامنت ها" color="primary" startIcon={<EditIcon/>}/>
                </Link>
                <Link className="link" to="/contents" onClick={changeUserDrawer}>
                    <ButtonComponent
                        className="button" text="مشاهده محتوا ها" color="secondary"
                                     startIcon={<EditIcon/>}/>
                </Link>
                <Link className="link" to="/edit-user"
                      onClick={changeUserDrawer}
                >
                    <ButtonComponent
                        className="button"
                        text="ویرایش پروفایل"
                        color="secondary"
                        startIcon={<EditIcon/>}/>
                </Link>
            </Box>
        </Box>
    </>);
}