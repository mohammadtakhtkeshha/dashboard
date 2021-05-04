import React, {useContext, useState} from 'react'
import {withNamespaces} from "react-i18next"
import i18next from "i18next"
import {NavLink, useHistory} from "react-router-dom"

import {makeStyles} from '@material-ui/core/styles/index'
import {Typography} from "@material-ui/core/index"
import ListItemText from "@material-ui/core/ListItemText"

import storage from 'libraries/local-storage'
import UserDrawerContentStyle from "assets/js/user/UserDrawerContent"
import {
    StyledGreenBackground,
    StyledProfile,
    StyledWhiteBackground,
    StyledSinusSvg,
    StyledLi,
    StyledUl,
} from "assets/js/user/UserDrawerContent"
import AvatarComponent from "infrastructure/authorized/partials/AvatarComponent.jsx"
import AppContext from "contexts/AppContext"
import sinusSvg from "assets/svg/sinusSvg.svg"
import {logout} from "core/services/auth.service"
import ObserveProfileModal from "./modal/ChangePasswordModal.jsx"

const useStyles = makeStyles(UserDrawerContentStyle)

function ProfileContentComponent({t}) {
    const classes = useStyles()
    const lang = i18next.language
    const appContext = useContext(AppContext)
    const [openObserveProfile, setOpenObserveProfile] = useState(false)
    let history = useHistory()
    const currentUser = JSON.parse(storage.get('user'))

    const changeUserDrawer = () => {
        appContext.toggleUserDrawer(false)
    }

    const closeDrawer = () => {
        appContext.toggleUserDrawer(false)
    }

    const logoutHandle = () => {
        logout(history)
        closeDrawer()
    }

    const changePasswordModal = () => {
        setOpenObserveProfile(true)
        closeDrawer()
    }

    return (<>
        <StyledGreenBackground>
            <StyledProfile>
                <AvatarComponent showBadge={false}
                                 width="4.8rem"
                                 height="4.8rem"
                                 style={{justifyContent: 'center'}}/>
                <Typography variant="h4">
                    {currentUser !== null && currentUser.roles !== undefined ? currentUser.name : ''}
                </Typography>
            </StyledProfile>
            <StyledSinusSvg src={sinusSvg} alt=""/>
        </StyledGreenBackground>
        <StyledWhiteBackground>
            <StyledUl lang={lang}>
                <StyledLi onClick={changeUserDrawer}>
                    <NavLink to='/dashboard' activeClassName={classes.active}>
                        <span className="icon"></span>
                        <ListItemText primary={t('users:observeProfile')}/>
                    </NavLink>
                </StyledLi>
                <StyledLi onClick={changePasswordModal}>
                    <NavLink to='/dashboard' activeClassName={classes.active}>
                        <span className="icon"></span>
                        <ListItemText primary={t('users:changePassword')}/>
                    </NavLink>
                </StyledLi>
                <StyledLi onClick={logoutHandle}>
                    <NavLink to='/dashboard' activeClassName={classes.active}>
                        <span className="icon"></span>
                        <ListItemText primary={t('translation:logout')}/>
                    </NavLink>
                </StyledLi>
            </StyledUl>
        </StyledWhiteBackground>
        <ObserveProfileModal openObserveProfile={openObserveProfile} setOpenObserveProfile={setOpenObserveProfile}/>
    </>)
}

export default withNamespaces('users')(ProfileContentComponent)
