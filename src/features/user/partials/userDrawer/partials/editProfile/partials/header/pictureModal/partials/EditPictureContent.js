import { getNewTokenWithRefreshToken } from "core/services/auth.service"
import { get, store } from "libraries/local-storage";
import { csrfUrl } from 'utils/urls/auth.urls'
import axios from "axios";
import {isObjectEmpty} from "../../../../../../../../../../methods/commons";
import {editUser} from "../../../../../../../../../../core/services/user.service";
import {success} from "../../../../../../../../../../methods/swal";
import i18next from "i18next";

export const getNewTokenMethod =  (setLoading) => {
    const body = new URLSearchParams();
    body.append('grant_type', 'refresh_token');
    body.append('refresh_token', get(process.env.REACT_APP_REFRESH_TOKEN));
    body.append('client_id', '2663b597-fa63-4191-9c75-5b36e01c7fca');
    body.append('client_secret', '147/*');
    getNewTokenWithRefreshToken(body, setLoading).then(res => {
        const { access_token, refresh_token } = res.data;
        store(process.env.REACT_APP_TOKEN_KEY, `Bearer ${access_token}`)
        store(process.env.REACT_APP_REFRESH_TOKEN, refresh_token)
        axios.get(csrfUrl).then(response => {
            store(process.env.REACT_APP_CSRF, JSON.stringify(response.data));
        })
    })
}

export const editUserMethod = (id, user, setLoading, getEditedUser, errors,setIsOpen) => {
    if (isObjectEmpty(errors)) {
        setLoading(true);
        editUser(id, JSON.stringify(user), setLoading).then(response => {
            setLoading(false);
            let item = response.data;
            const currentUser = JSON.parse(get('user'))
            currentUser.image = item.user_picture[0].url
            store('user',JSON.stringify(currentUser))
            getNewTokenMethod(setLoading)
            setIsOpen(false)
            success(i18next.t('translation:successEdited'), i18next.t('translation:ok'));
        });
    }
};

