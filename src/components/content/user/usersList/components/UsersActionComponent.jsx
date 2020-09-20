import React, {useContext} from "react";
import {withNamespaces} from "react-i18next";

import {primary, red, blue} from "components/partials/Colors";
import { warning} from "methods/swal";
import AppContext from "contexts/AppContext";
import storage from "libraries/local-storage";
import UserContext from "contexts/UserContext";
import {StyledButton,StyledMultiButtonsBlock} from "assets/js/App";
import {multiAction} from './methods/UserActionComponent'

function UsersActionComponent({t}) {
    const appContext = useContext(AppContext);
    const userContext = useContext(UserContext);
    const loginedUser = JSON.parse(storage.get('user'));
    const actions = [
        {value: 'delete', label: t('translation:delete'),color:red[1]},
        {value: 'block', label: t('translation:block'),color:blue[1]},
        {value: 'active', label: t('translation:active'),color: primary}
    ];

    const handleMultiAction = (e) => {
        const action=e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:ok'), t('translation:cancel')
            , t('translation:notDone'),function () {
                multiAction(action,appContext,userContext,loginedUser,t)
            });
    };

    return (<>
        <StyledMultiButtonsBlock>
        {actions.map((option) => (
            <StyledButton onClick={handleMultiAction} bg={option.color} key={option.value} value={option.value}>
                {option.label}
            </StyledButton>
        ))}
        </StyledMultiButtonsBlock>
    </>);
}

export default withNamespaces('translation')(UsersActionComponent);
