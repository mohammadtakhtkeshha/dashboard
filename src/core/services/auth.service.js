import axios from "axios";
import storage from "libraries/local-storage";
import authUrl, {debugUrl, logOutUrl,csrfUrl} from 'utils/urls/auth.urls';

export function getLoginUser(access_token) {
    let config = {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }
    return axios.get('http://dash.webrbp.ir/oauth/debug', config);
}

export async function login(user) {
    //get userdata and token and csrf
    let tokenUrl = authUrl.tokenUrl;
    const body = new URLSearchParams();
    body.append('grant_type', 'password');
    body.append('username', user.name);
    body.append('password', user.pass);
    body.append('client_id', '6ffb042e-988a-437b-9e30-db515a719cc8');
    body.append('client_secret', '147/*');

    const loginResult = await axios.post(tokenUrl, body);
    const token = `Bearer ${loginResult.data.access_token}`;
    storage.store('token', token);
    const config={
        headers:{
            'Authorization':token
        }
    };
    const getAdminData = await axios.get(debugUrl,config);
    storage.store('user', JSON.stringify(getAdminData.data));
    const {data} = await axios.get(csrfUrl);

    storage.store(process.env.REACT_APP_CSRF, JSON.stringify(data));
    return loginResult;
}

export async function logout(history) {
    const params = {
        "_format": "json",
        "token": JSON.parse(storage.get('logout_token'))
    };
    // axios({
    //     method: 'POST', //you can set what request you want to be
    //     url: logOutUrl,
    //     headers: {
    //             'Content-Type': 'application/json'
    //     },
    //     params: params
    // })
    storage.remove(process.env.REACT_APP_TOKEN_KEY);
    history.push("/login");
    storage.remove('user');
    // return  axios.post('http://sitesazyas.rbp/web/user/logout');
    return  'yes';

}

export default {login, logout, getLoginUser}
