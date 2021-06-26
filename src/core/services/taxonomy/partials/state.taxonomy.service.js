import { Method } from 'infrastructure/layout';
import {
  getTaxonomyImagesUrl,
  registerStateUrl,
  editStateUrl,
  deleteTerm,
  saveDragDropChangesStatesURL,
  getDeleteEditTermUrl,
} from 'utils/urls/taxonomy.urls';
import { authHeader, cjauthHeader, cjcsrfauthHeader } from 'utils/headers';

export function getStates(setLoading) {
  return Method({ method: 'get', url: getTaxonomyImagesUrl, headers: authHeader(), setLoading: setLoading });
}

export const getState = (id, setLoading) => {
  return Method({ method: 'get', url: getDeleteEditTermUrl(id), headers: authHeader(), setLoading: setLoading });
};

export const saveDragDropChanges = (type, setLoading, body) => {
  return Method({ method: 'PATCH', url: saveDragDropChangesStatesURL(type), headers: cjauthHeader(), body: body, setLoading: setLoading });
};

export const registerState = (setLoading, body, openForm) => {
  const url = openForm.id === '' ? registerStateUrl : editStateUrl(openForm.id);
  const method = openForm.id === '' ? 'post' : 'patch';
  return Method({ method: method, url: url, body: body, headers: cjcsrfauthHeader(), setLoading: setLoading });
};

export const deleteState = (id, setLoading) => {
  return Method({ method: 'DELETE', url: deleteTerm(id), headers: cjcsrfauthHeader(), setLoading: setLoading });
};
