import React, {useContext} from 'react';
import {withNamespaces} from 'react-i18next';

import {warning} from 'methods/swal';
import AppContext from 'contexts/AppContext';
import {StyledMultiButtonsBlock, StyledDeleteButton} from 'assets/js/library/components/buttons';
import {multiAction} from './CommentsActionComponent.js';
import i18next from 'i18next';
import {StyledActiveButton, StyledDeActiveButton} from "assets/js/library/pages/comment/commentAction"
import {get} from "libraries/local-storage";

function CommentsActionComponent({t, unconfirmedComments, publishedComments, commentStatus, selectedCheckBoxes, handlePagination}) {
    const {setLoading} = useContext(AppContext);
    const {permissions}=JSON.parse(get(process.env.REACT_APP_USER));

    const handleMultiAction = e => {
        const action = e.currentTarget.value;
        warning(
            i18next.t('translation:sureQuestion'),
            i18next.t('translation:yes'),
            i18next.t('translation:cancel'),
            i18next.t('translation:notDone'),
            function () {
                multiAction(action, setLoading, commentStatus, publishedComments, unconfirmedComments, selectedCheckBoxes, handlePagination);
            }
        );
    };

    return (
        <StyledMultiButtonsBlock>
            <StyledActiveButton
                permission="restful post comment_status_rest_resource"
                showAndPermission={!(commentStatus === "published") && permissions['restful post comment_status_rest_resource'].access}
                value="active"
                onClick={handleMultiAction}>
                {t('translation:active')}
            </StyledActiveButton>
            <StyledDeActiveButton
                permission="restful post comment_status_rest_resource"
                showAndPermission={commentStatus === "published" && permissions['restful post comment_status_rest_resource'].access}
                value="block"
                onClick={handleMultiAction}>
                {t('translation:block')}
            </StyledDeActiveButton>
            <StyledDeleteButton permission={permissions['restful post comment_delete_rest_resource'].access} value="delete" onClick={handleMultiAction}>
                {t('translation:delete')}
            </StyledDeleteButton>
        </StyledMultiButtonsBlock>
    );
}

export default withNamespaces('translation')(CommentsActionComponent);
