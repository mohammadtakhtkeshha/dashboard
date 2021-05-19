import { deleteEditRoleUrl } from 'utils/urls/roles.urls';
import { Method } from 'infrastructure/layout.js';
import { cjauthHeader } from 'utils/headers';
import { addRoleUrl, editDeketeRoleUrl, getPermissionListUrl } from '../../utils/urls/permission.urls';

export const getRole = (role, setLoading) => {
  let url = deleteEditRoleUrl(role);
  return Method({ method: 'GET', url: url, headers: cjauthHeader(), setLoading: setLoading });
};

export const deleteRole = (setLoading, role) => {
  let url = deleteEditRoleUrl(role);
  return Method({ method: 'DELETE', url: url, headers: cjauthHeader(), setLoading: setLoading });
};

export const editRole = (roleId, body, setLoading) => {
  return Method({ method: 'PATCH', url: editDeketeRoleUrl(roleId), headers: cjauthHeader(), setLoading: setLoading, body: body });
};

export const addRole = (setLoading, body) => {
  return Method({ method: 'POST', url: addRoleUrl, headers: cjauthHeader(), setLoading: setLoading, body: body });
};

export const getPermissionList = setLoading => {
  return Method({ method: 'GET', url: getPermissionListUrl, headers: cjauthHeader(), setLoading: setLoading });
};
