import React, { useContext } from 'react';
import { withNamespaces } from 'react-i18next';

import { warning } from 'methods/swal';
import AppContext from 'contexts/AppContext';
import { StyledMultiButtonsBlock, StyledDeleteButton } from 'assets/js/App';
import { multiAction } from './CommentsActionComponent.js';
import i18next from 'i18next';
import {StyledActiveButton,StyledDeActiveButton} from "assets/js/library/pages/comment/commentAction"

function CommentsActionComponent({ t, unconfirmedComments, publishedComments, commentStatus, selectedCheckBoxes, handlePagination }) {
  const { setLoading } = useContext(AppContext);

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
      <StyledActiveButton show={commentStatus === "published"} value="active" onClick={handleMultiAction}>
        {t('translation:active')}
      </StyledActiveButton>
      <StyledDeActiveButton show={commentStatus === "published"} value="block" onClick={handleMultiAction}>
        {t('translation:block')}
      </StyledDeActiveButton>
      <StyledDeleteButton value="delete" onClick={handleMultiAction}>
        {t('translation:delete')}
      </StyledDeleteButton>
    </StyledMultiButtonsBlock>
  );
}

export default withNamespaces('translation')(CommentsActionComponent);
