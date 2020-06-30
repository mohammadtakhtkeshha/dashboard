import axios from "axios";
import {apiUrl, tokenKey} from "../../config.json";
import storage from "../../libraries/local-storage";

export async function login(user) {
    let url = `${apiUrl}/user/login?_format=json`;
    let config = {headers: {'content-type': 'application/json'}};
    const result = await axios.post(url, user, config);
    const {current_user, csrf_token} = result.data;
    storage.store(tokenKey, csrf_token);
    storage.store('user', JSON.stringify(current_user));
    return result;
}

export async function logout(history) {
    // let url = 'http://sitesaz99.rbp/web/user/logout';
    let url = `${apiUrl}/user/logout`;
    let config = {headers: {'content-type': 'application/json'}};
    await axios.post(url, config);
    storage.remove(tokenKey);
    history.push("/login");
    storage.remove('token');
}

export default {login,logout};