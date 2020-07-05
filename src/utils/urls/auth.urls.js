const url = process.env.REACT_APP_API_URL;
// http://sitesaz99.rbp/web/oauth/token
export const logOut = `${url}/user/logout`;

export const login = `${url}/oauth/token`;

export default {
    logOut,login
}