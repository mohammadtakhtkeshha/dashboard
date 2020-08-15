const url = process.env.REACT_APP_API_URL;
export const logOut = `${url}/user/logout`;

export const loginUrl = `http://dash.webrbp.ir/user/login?_format=json`;

export const accessTokenUrl = `http://dash.webrbp.ir/oauth/token`;

export const loginedUserUrl = `http://dash.webrbp.ir/user/1?_format=json`;

export const getRolesUrl =`http://dash.webrbp.ir/api/rest/role?_format=json`;

export const deleteUserUrl =`${url}/api/rest/role?_format=json`;


export default {
    logOut,loginUrl,loginedUserUrl,getRolesUrl,accessTokenUrl
}