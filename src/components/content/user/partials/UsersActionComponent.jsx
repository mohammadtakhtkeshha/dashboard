import React, {useContext} from "react";
import {withNamespaces} from "react-i18next";

import { warning} from "methods/swal";
import AppContext from "contexts/AppContext";
import storage from "libraries/local-storage";
import {StyledRegisterButton,StyledMultiButtonsBlock,StyledEditButton,StyledDeleteButton} from "assets/js/App";
import {multiAction} from './UsersActionComponent.js'

function UsersActionComponent({t,selectedCheckBoxes,handlePagination,users}) {
    const appContext = useContext(AppContext);
    const loginedUser = JSON.parse(storage.get('user'));

    const handleMultiAction = (e) => {
        const action=e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:ok'), t('translation:cancel')
            ,t('translation:notDone'),function () {
                multiAction(action,appContext,selectedCheckBoxes,loginedUser,t,handlePagination,users)
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

export default withNamespaces('translation')(UsersActionComponent);
