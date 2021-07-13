import React, {useRef} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Typography} from "@material-ui/core";

import {StyledAddButton} from "assets/js/library/components/buttons";
import {StyledHead,StyledRelative} from "assets/js/library/base/all";
import {StyledHeadTypography} from "assets/js/library/base/typography";
import {get} from "libraries/local-storage";
import {StyledGreenButton} from "assets/js/library/components/buttons";

function FormHeaderContentComponent({t, lastActiveFocus, setOpenWebform, setIsTourOpen,setIsEditForm}) {
    const lang = i18next.language;
    const refList = useRef(null);
    const {permissions}=JSON.parse(get(process.env.REACT_APP_USER));

    const clickAddForm = () => {
        setOpenWebform(true)
        setIsEditForm(false)
    }

    return (<StyledHead lang={lang}>
        <StyledHeadTypography className="form-list" ref={refList}>{t('webforms:formsList')}</StyledHeadTypography>
        <StyledGreenButton onClick={() => {
                setIsTourOpen(true)
            }}>
            <Typography>{t('translation:guide')}</Typography>
        </StyledGreenButton>
        <StyledRelative>
            <StyledAddButton
                permission={`${permissions['restful post add_webform_rest_resource'].access}`}
                ref={lastActiveFocus}
                className="register-button"
                onClick={clickAddForm}>
                <Typography>{t('webforms:newForm')}</Typography>
            </StyledAddButton>
        </StyledRelative>
    </StyledHead>);
}

export default withNamespaces('users,translation')(FormHeaderContentComponent);
