import axios from "axios";
import {apiUrl} from "../../adf";
import storage from "../../libraries/local-storage";
import authUrl from './../../utils/urls/auth.urls'

export async function login(user) {
    let url = authUrl.login;
    let config = {headers: {'content-type': 'application/json'}};
    const data = new URLSearchParams();
    data.append('grant_type',  'password');
    data.append('client_id',  '8bf93f4b-4bdc-47cd-a7d5-1fd8114cbc9c');
    data.append('client_secret', '147/*');
    data.append('username', user.name);
    data.append('password', user.pass);

    const result = await axios.post(url, data);
    const {access_token} = result.data;
    debugger
    storage.store(process.env.REACT_APP_TOKEN_KEY, access_token);
    return result;
}

export async function logout(history) {
    let url = authUrl.logOut;
    let config = {
        headers: {
            'content-type': 'application/json',
        }
    };

    await axios.post(url, config);
    storage.remove(process.env.REACT_APP_TOKEN_KEY);
    history.push("/login");
    storage.remove('token');
}

export default {login, logout};