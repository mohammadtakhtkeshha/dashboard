import React from "react";
import {withNamespaces} from "react-i18next";

import {Typography,Box} from "@material-ui/core";

import {StyledButton, StyledHead, StyledHeadTypography} from "assets/js/App";
import {green} from "components/partials/Colors";
import CancelIconComponent from "../../../partials/CancelIconComponent";
import {ReactComponent as Exit} from "../../../../assets/svg/exit.svg";
import {ReactComponent as Lo} from "../../../partials/cancel-svgrepo-com(2).svg";
import {StyledSvg} from "assets/js/App";

function ContentHeaderComponent({t,setOpenRegisterForm}) {
    return(
        <StyledHead>

            <StyledHeadTypography>{t('contents:contentList')}</StyledHeadTypography>
            <StyledButton bg={green[1]} onClick={setOpenRegisterForm}>
                <Typography>{t('translation:registerContent')}</Typography>
            </StyledButton>
        </StyledHead>
    );
}

export default withNamespaces('contents')(ContentHeaderComponent);