const baseUrl = process.env.REACT_APP_API_URL;

export const getSettingsUrl = `${baseUrl}/api/rest/settings`
export const addSettingsUrl = `${baseUrl}/api/rest/setting `
export const addSettingsNameUrl = `${baseUrl}/api/rest/setting/base`
export const addSettingsTagsUrl = `${baseUrl}/api/rest/setting/metatag`
export const addSettingsIconsUrl = `${baseUrl}/api/rest/setting/icons`
