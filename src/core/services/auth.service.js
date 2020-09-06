import axios from "axios";
import storage from "../../libraries/local-storage";
import authUrl from './../../utils/urls/auth.urls'

export async function login(user) {
    let loginUrl = authUrl.loginUrl;
    let accessTokenUrl = authUrl.accessTokenUrl;
    let loginedUserUrl = authUrl.loginedUserUrl;
    // ---------- accessToken ---------
    const data = new URLSearchParams();
    data.append('grant_type', 'password');
    data.append('client_id', '15b03cb4-b4a9-4b80-96d4-3050583515a0');
    data.append('client_secret', '147/*');
    data.append('username', user.name);
    data.append('password', user.pass);
    const result = await axios.post(accessTokenUrl, data);
    const {access_token} = result.data;
    storage.store(process.env.REACT_APP_TOKEN_KEY, `Bearer ${access_token}`);
    // ---------- login ---------------
    let loginConfig = {headers: {'Content-Type': 'application/json'}};
    let loginData = {name: user.name, pass: user.pass};
    const loginResult = await axios.post(loginUrl, loginData, loginConfig);
    const {logout_token} = loginResult.data;
    storage.store(process.env.REACT_APP_LOGOUT_TOKEN, logout_token);
    // ---------- loginedUser ---------
    let config = {headers: {'Authorization': `Bearer ${access_token}`}};
    let loginedUser = await axios.get(loginedUserUrl, config);
    storage.store('user', JSON.stringify(loginedUser.data));
    return result;
}

export async function logout(history) {
    let url = 'http://dash.webrbp.ir/user/logout';
    let config = {
        headers:
            {
                'Authorization':storage.get(process.env.REACT_APP_TOKEN_KEY),
            },
        withCredentials: true,
    };
     axios.post(url, null, config);
    storage.remove(process.env.REACT_APP_TOKEN_KEY);
    storage.remove('lang');
    history.push("/login");
    storage.remove('user');
}


export default {login, logout};
