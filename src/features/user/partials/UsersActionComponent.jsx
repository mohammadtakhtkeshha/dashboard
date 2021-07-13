import React, {useContext} from 'react';
import {withNamespaces} from 'react-i18next';

import {warning} from 'methods/swal';
import AppContext from 'contexts/AppContext';
import storage from 'libraries/local-storage';
import {
    StyledMultiButtonsBlock,
    StyledEditButton,
    StyledDeleteButton, StyledGreenButton
} from 'assets/js/library/components/buttons';
import {multiActionMethod} from './UsersActionComponent.js';

function UsersActionComponent({t, selectedCheckBoxes, handlePagination, users}) {
    const {setLoading} = useContext(AppContext);
    const loginedUser = JSON.parse(storage.get('user'));

    const handleMultiAction = e => {
        const action = e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:yes'), t('translation:cancel'), t('translation:notDone'), function () {
            multiActionMethod(action, setLoading, selectedCheckBoxes, loginedUser, handlePagination, users);
        });
    };

    return (
        <StyledMultiButtonsBlock>
            <StyledGreenButton value="active" onClick={handleMultiAction}>
                {t('translation:active')}
            </StyledGreenButton>
            <StyledEditButton value="block" onClick={handleMultiAction}>
                {t('translation:block')}
            </StyledEditButton>
            <StyledDeleteButton permission="true" value="delete" onClick={handleMultiAction}>
                {t('translation:delete')}
            </StyledDeleteButton>
        </StyledMultiButtonsBlock>
    );
}

export default withNamespaces('translation')(UsersActionComponent);
