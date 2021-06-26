import { handleContentAction } from 'core/services/content.service';
import { multiAction } from '../Index.js';
import { warning } from 'methods/swal';
import i18next from "i18next";

const doAction = (action, selectedCheckBoxes, setLoading, contentsContext) => {
  if (action === 'delete') {
    handleContentAction('deleted', selectedCheckBoxes, setLoading).then(() => {
      const currentContents = multiAction(selectedCheckBoxes, contentsContext.contents, 'delete');
      contentsContext.handlePagination(currentContents, true, 'deletedSuccessfully');
    });
  } else if (action === 'block') {
    handleContentAction('false', selectedCheckBoxes, setLoading).then(() => {
      const currentContents = multiAction(selectedCheckBoxes, contentsContext.contents, 'false');
      contentsContext.handlePagination(currentContents, true, 'successDone');
    });
  } else {
    handleContentAction('true', selectedCheckBoxes, setLoading).then(() => {
      const currentContents = multiAction(selectedCheckBoxes, contentsContext.contents, 'true');
      contentsContext.handlePagination(currentContents, 'successDone');
    });
  }
};

export const doActionMethod = (e, selectedCheckBoxes, setLoading, contentsContext) => {
  const action = e.currentTarget.value;
  warning(i18next.t('translation:sureQuestion'), i18next.t('translation:yes'), i18next.t('translation:cancel'), i18next.t('translation:notDone'), function () {
    doAction(action, selectedCheckBoxes, setLoading, contentsContext);
  });
};
