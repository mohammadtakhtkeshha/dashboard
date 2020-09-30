import React from "react";
import {Typography} from "@material-ui/core";
import {StyledRegisterButton, StyledHead, StyledHeadTypography} from "assets/js/App";
import {green} from "components/partials/Colors";
import {withNamespaces} from "react-i18next";


function UsersHeaderComponent({t,setOpenUserForm}) {
    return (<StyledHead>
        <StyledHeadTypography>{t('users:usersList')}</StyledHeadTypography>
        <StyledRegisterButton onClick={() => setOpenUserForm({show:true,id:''})}>
            <Typography>{t('users:newUser')}</Typography>
        </StyledRegisterButton>
    </StyledHead>);
}

export default withNamespaces('users')(UsersHeaderComponent);
