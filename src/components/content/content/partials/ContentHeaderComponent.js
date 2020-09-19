import React from "react";
import {withNamespaces} from "react-i18next";

import {Typography} from "@material-ui/core";

import {StyledButton, StyledHead, StyledHeadTypography} from "assets/js/App";
import {primary} from "components/partials/Colors";

function ContentHeaderComponent({t,setOpenRegisterForm}) {
    return(
        <StyledHead>
            <StyledHeadTypography>{t('contents:contentList')}</StyledHeadTypography>
            <StyledButton bg={primary} onClick={() => setOpenRegisterForm(true)}>
                <Typography>{t('translation:registerContent')}</Typography>
            </StyledButton>
        </StyledHead>
    );
}

export default withNamespaces('contents')(ContentHeaderComponent);