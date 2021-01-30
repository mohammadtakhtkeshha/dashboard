import axios from "axios";
import {Method} from "structure/layout";
import {csrfUrl} from "../../utils/urls/auth.urls";
import userUrl from 'utils/urls/user.urls';
import {
    aacaauthHeader,
    authHeader,
    caauthHeader,
    cjcsrfauthHeader,
    cocdavcsrfauthHeader,
    avcoAuthcdHeader, cjajcharsetauthHeader,
} from "utils/headers";

export function getRoles(handleError) {
    let url = userUrl.getRolesUrl;
    return Method({method:'get',url:url,headers: authHeader,handleError:handleError});
}

export function deleteUser(id) {
    let url = userUrl.deleteUserAndGetUserForEditUrl(id);
    return axios.delete(url, authHeader);
}

export function getUsers(page) {
    let url = userUrl.getUsersUrl(page);
    return axios.get(url, authHeader);
}

export function getNotPaginateUser() {
    let url = userUrl.getNotPaginateUserUrl;
    return Method({url: url, headers:authHeader});
}

export function multiAction(data, handleError) {
    let url = userUrl.multiActionUrl;
    return Method({method: 'post', url: url, body: data, headers: aacaauthHeader, handleError: handleError});
}

export function getUser(id,handleError) {
    let url = userUrl.getUserUrl(id);
    return Method({method:'get',url:url,headers:authHeader,handleError:handleError});

}

export function editUser(id, data,handleError) {
    let url = userUrl.deleteUserAndGetUserForEditUrl(id);
    return Method({method:'patch',url:url,headers:caauthHeader,body:data,handleError:handleError});

}

export function registerUser(data,handleError) {
    let url = userUrl.registerUserUrl;
    return Method({method:'post',url:url,headers:cjcsrfauthHeader,body:data,handleError:handleError});

}

export async function saveUserImage(imgs,handleError) {
    const url = userUrl.saveUserImageUrl;
    return Method({method:'post',url:url,headers: cocdavcsrfauthHeader(imgs[0].name),body:imgs[0],handleError:handleError});

}

export default {
    getRoles, deleteUser,
    getUsers, multiAction, getUser, editUser,
    registerUser,
    saveUserImage, getNotPaginateUser
};
