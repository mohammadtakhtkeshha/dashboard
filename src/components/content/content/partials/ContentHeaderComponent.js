import React from "react";
import {withNamespaces} from "react-i18next";

import {Typography} from "@material-ui/core";

import {StyledRegisterButton, StyledHead, StyledHeadTypography} from "assets/js/App";
import {green} from "components/partials/Colors";

function ContentHeaderComponent({t,setOpenRegisterForm}) {
    return(
        <StyledHead>
            <StyledHeadTypography>{t('contents:contentList')}</StyledHeadTypography>
            <StyledRegisterButton bg={green[0]} onClick={setOpenRegisterForm}>
                <Typography>{t('translation:registerContent')}</Typography>
            </StyledRegisterButton>
        </StyledHead>
    );
}

export default withNamespaces('contents')(ContentHeaderComponent);