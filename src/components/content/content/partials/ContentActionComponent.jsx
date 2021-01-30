import React, {useContext} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Box} from "@material-ui/core";

import ContentsContext from "contexts/ContentsContext";
import {StyledDeleteButton, StyledEditButton, StyledMultiButtonsBlock, StyledRegisterButton} from "assets/js/App";
import AppContext from "contexts/AppContext";
import {doActionMethod} from "./ContentActionComponent.js";

function ContentActionComponent({t, selectedCheckBoxes}) {
    const lang = i18next.language;
    const appContext = useContext(AppContext);
    const contentsContext = useContext(ContentsContext);

    const doAction = (e) => {
        doActionMethod(e,t,selectedCheckBoxes, appContext, contentsContext);
    }

    return (
        <Box>
            <StyledMultiButtonsBlock lang={lang}>
                <StyledRegisterButton value="noBlock" onClick={doAction}>
                    {t('translation:published')}
                </StyledRegisterButton>
                <StyledEditButton value="block" onClick={doAction}>
                    {t('translation:unpublished')}
                </StyledEditButton>
                <StyledDeleteButton value="delete" onClick={doAction}>
                    {t('translation:delete')}
                </StyledDeleteButton>
            </StyledMultiButtonsBlock>
        </Box>
    );
}

export default withNamespaces('contents,translation')(ContentActionComponent);
