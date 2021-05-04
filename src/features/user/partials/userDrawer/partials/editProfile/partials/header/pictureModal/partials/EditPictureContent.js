import { getNewTokenWithRefreshToken } from "core/services/auth.service"
import { get, store } from "libraries/local-storage";
import { csrfUrl } from 'utils/urls/auth.urls'
import axios from "axios";


export const getNewTokenMethod =  (handleError) => {
    const body = new URLSearchParams();
    body.append('grant_type', 'refresh_token');
    body.append('refresh_token', get(process.env.REACT_APP_REFRESH_TOKEN));
    body.append('client_id', '2663b597-fa63-4191-9c75-5b36e01c7fca');
    body.append('client_secret', '147/*');
    getNewTokenWithRefreshToken(body, handleError).then(res => {
        const { access_token, refresh_token } = res.data;
        store(process.env.REACT_APP_TOKEN_KEY, `Bearer ${access_token}`)
        store(process.env.REACT_APP_REFRESH_TOKEN, refresh_token)
        axios.get(csrfUrl).then(response => {
            store(process.env.REACT_APP_CSRF, JSON.stringify(response.data));
        })
    })
}
