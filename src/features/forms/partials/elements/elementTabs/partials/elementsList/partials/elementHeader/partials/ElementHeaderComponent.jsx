import React from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Typography} from "@material-ui/core";

import {StyledHeadTypography} from "assets/js/library/base/typography";
import {StyledRelative,StyledHead} from "assets/js/library/base/all";
import {get} from "libraries/local-storage";
import {StyledGreenButton,StyledAddButton} from "assets/js/library/components/buttons";

function ElementHeaderComponent({t,setOpenElementForm, setIsTourOpen,setIsEditForm}) {
    const lang = i18next.language;
    const {permissions}=JSON.parse(get(process.env.REACT_APP_USER));

    const clickAddElement = () => {
        setOpenElementForm(true)
        setIsEditForm(false)
    }

    return (<StyledHead lang={lang}>
        <StyledHeadTypography className="element-list" >{t('webforms:elementsList')}</StyledHeadTypography>

        <StyledGreenButton onClick={() => {
            setIsTourOpen(true)
        }}>
            <Typography>{t('translation:guide')}</Typography>
        </StyledGreenButton>
        <StyledRelative>
                    <StyledAddButton
                        permission={`${permissions['restful post afzodan_webform_rest_resource'].access}`}
                        className="register-button" onClick={clickAddElement}>
                        <Typography>{t('webforms:addElement')}</Typography>
                    </StyledAddButton>
        </StyledRelative>
    </StyledHead>);
}

export default withNamespaces('users,translation')(ElementHeaderComponent);
