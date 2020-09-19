import React from "react";
import {Typography} from "@material-ui/core";
import {StyledButton, StyledHead, StyledHeadTypography} from "assets/js/App";
import {primary} from "components/partials/Colors";
import {withNamespaces} from "react-i18next";


function UsersHeaderComponent({t,setOpenNewUser}) {
    return (<StyledHead>
        <StyledHeadTypography>{t('users:usersList')}</StyledHeadTypography>
        <StyledButton bg={primary} onClick={() => setOpenNewUser(true)}>
            <Typography>{t('users:newUser')}</Typography>
        </StyledButton>
    </StyledHead>);
}

export default withNamespaces('users')(UsersHeaderComponent);
