import React, {useState} from 'react';
import clsx from "clsx";
import i18next from "i18next";

import {Box} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core/styles/index';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import SidebarMobile from '../../sidebar/SidebarMobileDrawerComponent';
import HeaderLeftWeb from '../web/partials/LeftWebHeaderComponent';
import {styles} from 'assets/js/HeaderMobile';
import {StyledMobileHeader,StyledLeftMobile,StyledRightMobile,StyledIconBlock} from "assets/js/library/pages/header/headerMobileTop";
import {logout} from "../../../../core/services/auth.service";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import {useHistory} from "react-router-dom";
import {ReactComponent as UserSvg} from "../../../../assets/svg/user.svg";

export default function HeaderMobileComponent() {
    let lang = i18next.language;
    let history = useHistory();
    const [showDrawer, setShowDrawer] = useState(false);
    const [showWebHeader, setshowWebHeader] = useState(false);
    const classes = makeStyles(styles);

    let closeDrawer = () => {
        setShowDrawer(false);
    };

    let toggleWebHeader = () => {
        if (showWebHeader) {
            setshowWebHeader(false);
        } else {
            setshowWebHeader(true);
        }
    };

    return (
        // <>
        //     <Box className={classes.mobileHeader}>
        //         <Box className={clsx(classes.buttonBlock, lang === 'en' ? 'leftAuto' : 'rightAuto')}>
        //             <button className={clsx('headerButton', lang === 'en' ? 'marginLeft' : 'marginRight')}
        //                     onClick={() => setShowDrawer(true)}>
        //                 <MenuIcon/>
        //             </button>
        //             <button className={clsx('headerButton', lang === 'en' ? 'marginLeft' : 'marginRight')}>
        //                 <ArrowDownwardIcon onClick={toggleWebHeader}/>
        //             </button>
        //         </Box>
        //         <SidebarMobile closeDrawer={closeDrawer} showDrawer={showDrawer}/>
        //     </Box>
        //     {showWebHeader ? <Box className={classes.showWebHeader}>
        //         <HeaderLeftWeb/>
        //     </Box> : ''}
        //     <HeaderLeftWeb/>
        // </>
        <StyledMobileHeader lang={lang}>
            <StyledRightMobile>
                <StyledIconBlock>
                    <button
                        // onClick={changeDrawerUser}
                    >
                        <UserSvg fontSize="small"/>
                    </button>
                </StyledIconBlock>
                <StyledIconBlock>
                    <button
                        // onClick={changeDrawerUser}
                    >
                        <UserSvg fontSize="small"/>
                    </button>
                </StyledIconBlock>
            </StyledRightMobile>
            <StyledLeftMobile lang={lang}>
                <button onClick={() => logout(history)}>
                    <PowerSettingsNewIcon/>
                </button>
            </StyledLeftMobile>
        </StyledMobileHeader>
    );
}

