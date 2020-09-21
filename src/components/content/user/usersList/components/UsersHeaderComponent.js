import React from "react";
import {Typography} from "@material-ui/core";
import {StyledButton, StyledHead, StyledHeadTypography} from "assets/js/App";
import {primary} from "components/partials/Colors";
import {withNamespaces} from "react-i18next";


function UsersHeaderComponent({t,setOpenUserForm}) {
    return (<StyledHead>
        <StyledHeadTypography>{t('users:usersList')}</StyledHeadTypography>
        <StyledButton bg={primary} onClick={() => setOpenUserForm({show:true,id:''})}>
            <Typography>{t('users:newUser')}</Typography>
        </StyledButton>
    </StyledHead>);
}

export default withNamespaces('users')(UsersHeaderComponent);
