import { deleteState, saveDragDropChanges } from 'core/services/taxonomy/partials/state.taxonomy.service';
import { success } from 'methods/swal';
import i18next from 'i18next';

export const deleteStateMethod = (id, states, setLoading, setStates, setIds, getStates) => {
  setLoading(true);
  deleteState(id, setLoading).then(response => {
    setLoading(false);
    getStates();
    // getStatesMethod(setLoading, setStates, handlePagination, setIds)
    success(i18next.t('translation:deletedSuccessfully'), i18next.t('translation:ok'));
  });
};

export const saveChangesMethod = (setLoading, states, type) => {
  setLoading(true);
  saveDragDropChanges(type.type, setLoading, states).then(response => {
    setLoading(false);
    success(i18next.t('translation:registeredChanges'), i18next.t('translation:ok'));
  });
};
