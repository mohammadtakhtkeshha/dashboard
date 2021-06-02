import React from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Typography} from "@material-ui/core";

import {StyledAddButton, StyledHead, StyledHeadTypography} from "assets/js/App";
import {StyledRelative} from "assets/js/App";
import {StyledHelpButton} from "assets/js/library/pages/content/contentHeader";
import {get} from "libraries/local-storage";

function ElementHeaderComponent({t,setOpenElementForm, setIsTourOpen}) {
    const lang = i18next.language;
    const helpPermission = JSON.parse(get(process.env.REACT_APP_USER))

    return (<StyledHead lang={lang}>
        <StyledHeadTypography className="user-list" >{t('webforms:elementsList')}</StyledHeadTypography>
        <StyledHelpButton permission={helpPermission.permissions['access administration pages'].access} onClick={() => {
            setIsTourOpen(true)
        }}>
            <Typography>{t('translation:guide')}</Typography>
        </StyledHelpButton>
        <StyledRelative>
                    <StyledAddButton className="register-button"
                                     onClick={() => setOpenElementForm({show: true, id: ''})}>
                        <Typography>{t('webforms:addElement')}</Typography>
                    </StyledAddButton>
        </StyledRelative>
    </StyledHead>);
}

export default withNamespaces('users,translation')(ElementHeaderComponent);
