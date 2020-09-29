import React from "react";
import {Typography} from "@material-ui/core";
import {StyledButton, StyledHead, StyledHeadTypography} from "assets/js/App";
import {green} from "components/partials/Colors";
import {withNamespaces} from "react-i18next";


function UsersHeaderComponent({t,setOpenUserForm}) {
    return (<StyledHead>
        <StyledHeadTypography>{t('users:usersList')}</StyledHeadTypography>
        <StyledButton bg={green[1]} onClick={() => setOpenUserForm({show:true,id:''})}>
            <Typography>{t('users:newUser')}</Typography>
        </StyledButton>
    </StyledHead>);
}

export default withNamespaces('users')(UsersHeaderComponent);
