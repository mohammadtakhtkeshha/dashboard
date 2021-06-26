import { Method } from 'infrastructure/layout';
import { authHeader, cjcsrfauthHeader, cjauthHeader } from 'utils/headers';
import { getMenusWebUrl, addMenuUrl, getMenusMobileUrl, getDeleteEditMenuUrl, saveDragDropChangesMenuURL } from 'utils/urls/menu.urls';

export const getMenus = (type, setLoading) => {
  let url = type === 'web' ? getMenusWebUrl : getMenusMobileUrl;
  return Method({ method: 'GET', url: url, headers: authHeader(), setLoading: setLoading });
};

export const deleteMenu = (id, setLoading) => {
  return Method({ method: 'DELETE', url: getDeleteEditMenuUrl(id), headers: cjcsrfauthHeader(), setLoading: setLoading });
};

export const saveDragDropChanges = (type, setLoading, body) => {
  return Method({ method: 'PATCH', url: saveDragDropChangesMenuURL(type), headers: cjauthHeader(), body: body, setLoading: setLoading });
};

export const editMenu = (setLoading, body) => {
  return Method({ method: 'PATCH', url: getDeleteEditMenuUrl, headers: cjcsrfauthHeader(), setLoading: setLoading, body: body });
};

export const addMenu = (setLoading, body, id) => {
  let method = id === '' ? 'POST' : 'PATCH';
  let url = id === '' ? addMenuUrl : getDeleteEditMenuUrl(id);
  return Method({ method: method, url: url, headers: cjcsrfauthHeader(), setLoading: setLoading, body: body });
};

export const getMenu = (setLoading, id) => {
  return Method({ method: 'GET', url: getDeleteEditMenuUrl(id), headers: cjcsrfauthHeader(), setLoading: setLoading });
};