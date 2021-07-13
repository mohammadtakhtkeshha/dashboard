import React, {useContext} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import ContentsContext from "contexts/ContentsContext";
import {
    StyledDeleteButton,
    StyledEditButton,
    StyledMultiButtonsBlock,
    StyledGreenButton
} from "assets/js/library/components/buttons";
import AppContext from "contexts/AppContext";
import {doActionMethod} from "./ContentActionComponent.js";

function ContentActionComponent({t, selectedCheckBoxes}) {
    const lang = i18next.language;
    const {setLoading} = useContext(AppContext);
    const contentsContext = useContext(ContentsContext);

    const doAction = (e) => {
        doActionMethod(e, selectedCheckBoxes, setLoading, contentsContext);
    }

    return (<StyledMultiButtonsBlock lang={lang}>
            <StyledGreenButton value="noBlock" onClick={doAction}>
                {t('translation:published')}
            </StyledGreenButton>
            <StyledEditButton value="block" onClick={doAction}>
                {t('translation:unpublished')}
            </StyledEditButton>
            <StyledDeleteButton permission="true" value="delete" onClick={doAction}>
                {t('translation:delete')}
            </StyledDeleteButton>
        </StyledMultiButtonsBlock>);
}

export default withNamespaces('contents,translation')(ContentActionComponent);
