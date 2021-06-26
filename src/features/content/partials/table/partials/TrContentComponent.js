import { warning } from 'methods/swal';
import { deleteContent } from 'core/services/content.service';
import i18next from "i18next";

export const isCheckedHandlerMethod = (e, content, setSelectedCheckBoxes, selectedCheckBoxes) => {
  let currentId = content.nid;
  if (e.currentTarget.checked) {
    setSelectedCheckBoxes([...selectedCheckBoxes, currentId]);
  } else {
    let filteredSelected = selectedCheckBoxes.filter(item => item !== currentId);
    setSelectedCheckBoxes([...filteredSelected]);
  }
};

const deleteContentMethod = (id, setLoading, contentsContext) => {
  deleteContent(id, setLoading).then(response => {
    let newContents = contentsContext.contents.filter(content => content.nid !== id);
    contentsContext.handlePagination(newContents, true, 'deletedSuccessfully');
  });
};

export const confirmDeleteHandlerMethod = (e, setLoading, contentsContext) => {
  let id = e.currentTarget.value;
  warning(i18next.t('translation:sureQuestion'), i18next.t('translation:yes'), i18next.t('translation:cancel'), i18next.t('translation:notDone'), function () {
    deleteContentMethod(id, setLoading, contentsContext);
  });
};
