import React, {useContext} from "react";
import {withNamespaces} from "react-i18next";

import {warning} from "methods/swal";
import AppContext from "contexts/AppContext";
import {StyledRegisterButton, StyledMultiButtonsBlock, StyledEditButton, StyledDeleteButton} from "assets/js/App";
import {multiAction} from './CommentsActionComponent.js'

function CommentsActionComponent({t, unconfirmedComments, publishedComments, commentStatus,selectedCheckBoxes,handlePagination}) {
    const appContext = useContext(AppContext);

    const handleMultiAction = (e) => {
        const action = e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:ok'), t('translation:cancel'), t('translation:notDone'),
            function () {
            multiAction(t, action, appContext,commentStatus, publishedComments,unconfirmedComments,selectedCheckBoxes,handlePagination)
        });
    };

    return (
        <StyledMultiButtonsBlock>
            <StyledRegisterButton value="active" onClick={handleMultiAction}>
                {t('translation:active')}
            </StyledRegisterButton>
            <StyledEditButton value="block" onClick={handleMultiAction}>
                {t('translation:block')}
            </StyledEditButton>
            <StyledDeleteButton value="delete" onClick={handleMultiAction}>
                {t('translation:delete')}
            </StyledDeleteButton>
        </StyledMultiButtonsBlock>
    );
}

export default withNamespaces('translation')(CommentsActionComponent);
