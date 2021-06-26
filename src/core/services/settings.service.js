import { Method } from 'infrastructure/layout';
import { getSettingsUrl, addSettingsUrl ,addSettingsNameUrl,addSettingsTagsUrl,addSettingsIconsUrl} from 'utils/urls/settings.urls';
import { authHeader, cjcsrfauthHeader } from 'utils/headers';

export const getSettings = setLoading => {
  return Method({ method: 'get', url: getSettingsUrl, headers: authHeader(), setLoading: setLoading });
};

export const addSettings = (body, setLoading) => {
  return Method({ method: 'post', url: addSettingsUrl, headers: cjcsrfauthHeader(), setLoading: setLoading, body: body });
};

export const addSettingsName = (body, setLoading) => {
  return Method({ method: 'post', url: addSettingsNameUrl, headers: cjcsrfauthHeader(), setLoading: setLoading, body: body });
};

export const addSettingsTags = (body, setLoading) => {
  return Method({ method: 'post', url: addSettingsTagsUrl, headers: cjcsrfauthHeader(), setLoading: setLoading, body: body });
};

export const addSettingsIcons = (body, setLoading) => {
  return Method({ method: 'post', url: addSettingsIconsUrl, headers: cjcsrfauthHeader(), setLoading: setLoading, body: body });
};