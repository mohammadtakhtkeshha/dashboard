const baseUrl = process.env.REACT_APP_API_URL;

export const tokenUrl = `${baseUrl}/oauth/token`;

export const csrfUrl = `${baseUrl}/rest/session/token`;

export const debugUrl = `${baseUrl}/oauth/debug`;

export const logOutUrl = `${baseUrl}/user/logout`;

export default {logOutUrl, debugUrl,tokenUrl}
