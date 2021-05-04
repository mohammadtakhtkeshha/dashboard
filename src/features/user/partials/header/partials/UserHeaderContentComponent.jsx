import React, {useRef} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Typography} from "@material-ui/core";

import {StyledAddButton, StyledHead, StyledHeadTypography} from "assets/js/App";
import {StyledRelative} from "assets/js/App";
import {StyledHelpButton} from "assets/js/library/pages/content/contentHeader";
import {get} from "libraries/local-storage";

function UserHeaderContentComponent({t, lastActiveFocus,setOpenUserForm, setIsTourOpen}) {
    const lang = i18next.language;
    const refList = useRef(null);
    const helpPermission = JSON.parse(get(process.env.REACT_APP_USER))

    return (<StyledHead lang={lang}>
        <StyledHeadTypography className="user-list" ref={refList}>{t('users:usersList')}</StyledHeadTypography>
        <StyledHelpButton permission={helpPermission.permissions['access administration pages'].access} onClick={() => {
            setIsTourOpen(true)
        }}>
            <Typography>{t('translation:guide')}</Typography>
        </StyledHelpButton>
        <StyledRelative>
                    <StyledAddButton ref={lastActiveFocus}  className="register-button"
                                     onClick={() => setOpenUserForm({show: true, id: ''})}>
                        <Typography>{t('users:newUser')}</Typography>
                    </StyledAddButton>
        </StyledRelative>
    </StyledHead>);
}

export default withNamespaces('users,translation')(UserHeaderContentComponent);
