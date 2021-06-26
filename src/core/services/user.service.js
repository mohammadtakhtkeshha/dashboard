import { Method } from 'infrastructure/layout';
import {
  getRolesUrl,
  getUsersUrl,
  getUserUrl,
  changePassUrl,
  getNotPaginateUserUrl,
  multiActionUrl,
  saveUserImageUrl,
  registerUserUrl,
  deleteUserAndGetUserForEditUrl,
} from 'utils/urls/user.urls';
import { aacaauthHeader, authHeader, caauthHeader, cjcsrfauthHeader, cjajauthHeader, cocdavcsrfauthHeader } from 'utils/headers';

export const getNotPaginateUser = setLoading => {
  return Method({ url: getNotPaginateUserUrl, headers: authHeader(), setLoading: setLoading });
};

export const getRoles = setLoading => {
  return Method({ method: 'get', url: getRolesUrl, headers: authHeader(), setLoading: setLoading });
};

export const deleteUser = (id, setLoading) => {
  return Method({ method: 'delete', url: deleteUserAndGetUserForEditUrl(id), headers: authHeader(), setLoading: setLoading });
};

export const getUsers = (page, setLoading) => {
  return Method({ method: 'get', url: getUsersUrl(page), headers: authHeader(), setLoading: setLoading });
};

export const multiAction = (data, setLoading) => {
  return Method({ method: 'post', url: multiActionUrl, body: data, headers: aacaauthHeader(), setLoading: setLoading });
};

export const getUser = (id, setLoading) => {
  return Method({ method: 'get', url: getUserUrl(id), headers: authHeader(), setLoading: setLoading });
};

export const editUser = (id, data, setLoading) => {
  return Method({ method: 'patch', url: deleteUserAndGetUserForEditUrl(id), headers: caauthHeader(), body: data, setLoading: setLoading });
};

export const registerUser = (data, setLoading) => {
  return Method({ method: 'post', url: registerUserUrl, headers: cjcsrfauthHeader(), body: data, setLoading: setLoading });
};

export const saveUserImage = (imgs, setLoading) => {
  return Method({ method: 'post', url: saveUserImageUrl, headers: cocdavcsrfauthHeader(imgs[0].name), body: imgs[0], setLoading: setLoading });
};

export const registerChangePass = (body, setLoading) => {
  //  const cjajauthHeaderr = {
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //         'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBkNTgzYjdkMjdkYzcwMGFlNzUxMjg5MjNhYjEwNTk0ZmQ5M2Y1MWQ5M2JmZGJlNjkwNTQ1NWYzYTQ5M2RhMzA2ZTgwOTBiYWMzZTZlMjE4In0.eyJhdWQiOiI2ZmZiMDQyZS05ODhhLTQzN2ItOWUzMC1kYjUxNWE3MTljYzgiLCJqdGkiOiIwZDU4M2I3ZDI3ZGM3MDBhZTc1MTI4OTIzYWIxMDU5NGZkOTNmNTFkOTNiZmRiZTY5MDU0NTVmM2E0OTNkYTMwNmU4MDkwYmFjM2U2ZTIxOCIsImlhdCI6MTYxODM4MTIwMCwibmJmIjoxNjE4MzgxMjAwLCJleHAiOjE2MTk5ODEyMDAsInN1YiI6IjE5MyIsInNjb3BlcyI6WyJhdXRoZW50aWNhdGVkIiwicmVzdF91c2VyIl19.PtwMK2BHRtZtBOnlAOTVxiSSInKx20Y-knlP1x46zRTvFGhXAZeKX9EUL82zHYm5R5TFWUWzRoL7smBrz-4kxjXQU0rTWplEeQTlbDYjBeGUdFzbuXK5JnTcevWZNOQo3VFne6yJP3AAjsp37tO8n6X4BnEsza58gAVeLKiWO7dNu24o7lo8W4gq92ps2-gnFQ7QZi7UijuManyrAQXIKa7FPcPdGTeyQB22CJS3Dke6gcgIlbUjlA2AgKqQi6KRpdybmdNVGcZ_TXJQdbYIMQQSe7hnVi63VQ_gCkgAwH_ZFYYH8LfP950kjjt40CzNCPNSLSNIWwAWvA8_W8cMFA`
  //     }
  // }
  return Method({ method: 'POST', url: changePassUrl, headers: cjajauthHeader(), body: body, setLoading: setLoading });
};