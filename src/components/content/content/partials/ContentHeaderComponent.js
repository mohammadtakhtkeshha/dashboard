import React from "react";
import {withNamespaces} from "react-i18next";

import {Typography,Box} from "@material-ui/core";

import {StyledButton, StyledHead, StyledHeadTypography} from "assets/js/App";
import {primary,green} from "components/partials/Colors";

function ContentHeaderComponent({t,setOpenRegisterForm}) {
    return(
        <StyledHead>
            <Box>
            <button style={{backgroundColor:green[0],border:0,padding:'10px',color:'white'}}>one</button>
            <button style={{backgroundColor:green[1],border:0,padding:'10px',color:'white'}}>two</button>
            <button style={{backgroundColor:green[2],border:0,padding:'10px',color:'white'}}>three</button>
            </Box>
            <StyledHeadTypography>{t('contents:contentList')}</StyledHeadTypography>
            <StyledButton bg={primary} onClick={setOpenRegisterForm}>
                <Typography>{t('translation:registerContent')}</Typography>
            </StyledButton>
        </StyledHead>
    );
}

export default withNamespaces('contents')(ContentHeaderComponent);