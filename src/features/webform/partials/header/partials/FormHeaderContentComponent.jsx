import React, {useRef} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Typography} from "@material-ui/core";

import {StyledAddButton, StyledHead, StyledHeadTypography} from "assets/js/App";
import {StyledRelative} from "assets/js/App";
import {StyledHelpButton} from "assets/js/library/pages/content/contentHeader";
import {get} from "libraries/local-storage";

function FormHeaderContentComponent({t, lastActiveFocus, setOpenWebform, setIsTourOpen}) {
    const lang = i18next.language;
    const refList = useRef(null);
    const helpPermission = JSON.parse(get(process.env.REACT_APP_USER))

    return (<StyledHead lang={lang}>
        <StyledHeadTypography className="form-list" ref={refList}>{t('webforms:formsList')}</StyledHeadTypography>
        <StyledHelpButton
            permission={helpPermission.permissions['access administration pages'].access}
            onClick={() => {
                setIsTourOpen(true)
            }}>
            <Typography>{t('translation:guide')}</Typography>
        </StyledHelpButton>
        <StyledRelative>
            <StyledAddButton
                ref={lastActiveFocus}
                className="register-button"
                onClick={() => setOpenWebform(true)}>
                <Typography>{t('webforms:newForm')}</Typography>
            </StyledAddButton>
        </StyledRelative>
    </StyledHead>);
}

export default withNamespaces('users,translation')(FormHeaderContentComponent);
