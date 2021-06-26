import React, {useRef} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Typography} from "@material-ui/core";

import {StyledAddButton, StyledHead, StyledHeadTypography} from "assets/js/App";
import {StyledRelative} from "assets/js/App";
import {StyledHelpButton} from "assets/js/library/pages/content/contentHeader";
import {StyledGreenButton} from "assets/js/library/components/buttons";

import {get} from "libraries/local-storage";

function UserHeaderContentComponent({t, lastActiveFocus, setOpenUserForm, setIsTourOpen}) {
    const lang = i18next.language;
    const refList = useRef(null);
    const {permissions} = JSON.parse(get(process.env.REACT_APP_USER))

    return (<StyledHead lang={lang}>
        <StyledHeadTypography className="user-list" ref={refList}>{t('users:usersList')}</StyledHeadTypography>
        <StyledGreenButton
            onClick={() => {
                setIsTourOpen(true)
            }}
        >
            <Typography>{t('translation:guide')}</Typography>
        </StyledGreenButton>
        <StyledRelative>
            <StyledAddButton
                permission={`${permissions['administer users'].access}`}
                ref={lastActiveFocus}
                className="register-button"
                onClick={() => setOpenUserForm({show: true, id: ''})}>
                <Typography>{t('users:newUser')}</Typography>
            </StyledAddButton>
        </StyledRelative>
    </StyledHead>);
}

export default withNamespaces('users,translation')(UserHeaderContentComponent);
