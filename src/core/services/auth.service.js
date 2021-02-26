import axios from "axios";
import storage, {changeValueStorage} from "libraries/local-storage";
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

    const config={
        headers:{
            'Authorization':token
        }
    }
    const getAdminData = await axios.get(debugUrl,config);
    const {data} = await axios.get(csrfUrl)
    storage.store(process.env.REACT_APP_TOKEN_KEY, token);
    storage.store('user', JSON.stringify(getAdminData.data));
    storage.store(process.env.REACT_APP_CSRF, JSON.stringify(data));
    return loginResult;
}

export async function loginTicketService() {debugger
    const params = {
        action:'ValidateLogin',
        username:'sBnBbvTbSBpFfIWKeCycxDHNqh8U2vn6',
        password:'F5tqf9CdD6rLYpIdITlHryNzevXUDe6d',
        responsetype:'json',
        email:'farhangyaran@gmail.com',
        password2:'147/*'
    }
    return axios.get('http://crm.webrbp.ir/includes/api.php', {params:params
    },{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(()=>{debugger
        storage.store('isLoginTicket', 'aasdfasd');
    })
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
    storage.remove(process.env.REACT_APP_ISTICKET_LOGIN)
    storage.remove(process.env.REACT_APP_CSRF)
    storage.remove(process.env.REACT_APP_TICKET_PERIOD)

    // return  axios.post('http://sitesazyas.rbp/web/user/logout');
    return  'yes';

}

export default {login, logout, getLoginUser,loginTicketService}
