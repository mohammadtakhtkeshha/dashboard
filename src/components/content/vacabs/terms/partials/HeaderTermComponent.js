import {withNamespaces} from "react-i18next";
import React from "react";

import {Typography} from "@material-ui/core";

import {StyledButton, StyledHead, StyledHeadTypography} from "assets/js/App";
import {primary} from "components/partials/Colors";

function HeaderTermComponent({t,setOpenTermForm}) {
    return (<>
        <StyledHead>
            <StyledHeadTypography>{t('vocabs:termList')}</StyledHeadTypography>
            <StyledButton bg={primary} onClick={setOpenTermForm}>
                <Typography>{t('vocabs:newTerm')}</Typography>
            </StyledButton>
        </StyledHead>
    </>);
}

export default withNamespaces('vocabs')(HeaderTermComponent);