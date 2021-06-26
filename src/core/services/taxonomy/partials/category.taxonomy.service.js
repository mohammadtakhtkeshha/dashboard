import { Method } from 'infrastructure/layout';
import { registerStateUrl, editStateUrl, deleteTerm, getDeleteEditTermUrl, getTaxonomyTermUrl } from 'utils/urls/taxonomy.urls';
import { authHeader, cjcsrfauthHeader } from 'utils/headers';

export function getStates(setLoading, type) {
  return Method({ method: 'get', url: getTaxonomyTermUrl(type), headers: authHeader(), setLoading: setLoading });
}

export function getState(id, setLoading) {
  return Method({ method: 'get', url: getDeleteEditTermUrl(id), headers: authHeader(), setLoading: setLoading });
}

export const registerState=(setLoading, body, openForm) => {debugger
  const url = openForm.id === '' ? registerStateUrl : editStateUrl(openForm.id);
  const method = openForm.id === '' ? 'post' : 'patch';
  return Method({ method: method, url: url, body: body, headers: cjcsrfauthHeader(), setLoading: setLoading });
}

export function deleteState(id, setLoading) {
  return Method({ method: 'DELETE', url: deleteTerm(id), headers: cjcsrfauthHeader(), setLoading: setLoading });
}
