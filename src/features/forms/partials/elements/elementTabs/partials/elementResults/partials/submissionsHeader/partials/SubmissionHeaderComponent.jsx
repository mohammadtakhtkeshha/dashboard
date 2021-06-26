import React from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Typography} from "@material-ui/core";

import {StyledHead, StyledHeadTypography} from "assets/js/App";
import {StyledGreenButton} from "assets/js/library/components/buttons";

function SubmissionHeaderComponent({t, setIsTourOpen}) {
    const lang = i18next.language;

    return (<StyledHead lang={lang}>
        <StyledHeadTypography className="element-list">
            {t('webforms:elementsList')}
        </StyledHeadTypography>
        <StyledGreenButton onClick={() => {
            setIsTourOpen(true)
        }}>
            <Typography>{t('translation:guide')}</Typography>
        </StyledGreenButton>
    </StyledHead>);
}

export default withNamespaces('users,translation')(SubmissionHeaderComponent);
