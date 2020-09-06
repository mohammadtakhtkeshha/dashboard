import axios from "axios";
import userUrl from 'utils/urls/user.urls';
import {aacaauthHeader, authHeader, caauthHeader, ahchauthHeader, chauthHeader,avcoAuthcdHeader} from "utils/headers";

export function getRoles() {
    let url = userUrl.getRolesUrl;
    return axios.get(url, ahchauthHeader);
}

export function deleteUser(id) {
    let url = userUrl.deleteUserAndGetUserForEditUrl(id);
    return axios.delete(url, authHeader);
}

export function getUsers(page) {
    let url =userUrl.getUsersUrl(page);
   return axios.get(url, authHeader);
};

export function getNotPaginateUser(){
    let url =userUrl.getNotPaginateUserUrl;
   return axios.get(url, authHeader);
}

export function multiAction(data) {
    let url = userUrl.multiActionUrl;
    return  axios.post(url, data, aacaauthHeader);
};

export function getUser(id) {
    let url = userUrl.getUserUrl(id);
    return axios.get(url, authHeader);
};

export function editUser(id,data) {
    let url = userUrl.deleteUserAndGetUserForEditUrl(id);
    return axios.patch(url, data, caauthHeader);
};

export function registerUser(data) {
    let url= userUrl.registerUserUrl;
    return axios.post(url, data, chauthHeader);
}

export function saveUserImage(img) {
    let url =userUrl.saveUserImageUrl;
    return axios.post(url, img, avcoAuthcdHeader(img));
}

export default { getRoles , deleteUser ,
    getUsers,multiAction,getUser,editUser,
    registerUser,
    saveUserImage,getNotPaginateUser};
