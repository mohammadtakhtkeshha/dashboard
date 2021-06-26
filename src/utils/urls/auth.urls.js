const baseUrl = process.env.REACT_APP_API_URL;

export const exTokenUrl = `${baseUrl}/oauth/token`;

export const tokenUrl = `${baseUrl}/soc/modifiedToken`;

export const csrfUrl = `${baseUrl}/rest/session/token`;

export const debugUrl = `${baseUrl}/oauth/debug`;

export const logOutUrl = `${baseUrl}/user/logout`;


