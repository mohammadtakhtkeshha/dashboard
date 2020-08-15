import axios from "axios";
import storage from "../../libraries/local-storage";
import userUrl from './../../utils/urls/user.urls';
import swal from "sweetalert";

export function getRoles() {
    let url = userUrl.getRolesUrl;
    const config = {
        headers: {
            'Content-Type': 'application/hal+json',
            'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
            'Accept': 'application/hal+json'
        }
    };
    return axios.get(url, config);
}

export function deleteUser(id) {
    let url = userUrl.deleteUserUrl(id);
    let config = {
        headers: {
            Authorization: storage.get(process.env.REACT_APP_TOKEN_KEY),
        }
    };
    return axios.delete(url, config);
}

export function getUsers(page) {
    const config = {
        headers: {
            Authorization: storage.get(process.env.REACT_APP_TOKEN_KEY)
        }
    };
    let url =userUrl.getUsersUrl(page);
   return axios.get(url, config);
};

export function multiAction(data) {
    let url = userUrl.multiActionUrl;
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
            'Accept': 'application/json',
            'X-CSRF-Token': storage.get(process.env.REACT_APP_CSRF_TOKEN),
        }
    };
    return  axios.post(url, data, config);
};

export function getUser(id) {
    let url = userUrl.getUserUrl(id);
    let config = {
        headers: {
            Authorization: storage.get(process.env.REACT_APP_TOKEN_KEY)
        }
    };
    return axios.get(url, config);
};

export function editUser(id,data) {
    let url = `http://dash.webrbp.ir/user/${id}?_format=json`;
    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
            'X-CSRF-Token': storage.get(process.env.REACT_APP_CSRF_TOKEN),
        }
    };
    return axios.patch(url, data, config);
};

export function registerUser(data) {
    let url= userUrl.registerUserUrl;
    const headers = {
        headers: {
            'Content-Type': "application/hal+json",
            'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
            // 'Accept': 'application/hal+json',
            // 'X-CSRF-Token': storage.get(process.env.REACT_APP_CSRF_TOKEN)
        }
    };
    return axios.post(url, data, headers);
}

export function saveUserImage(img) {debugger
    const config = {
        headers: {
            'Content-Type': 'application/octet-stream',
            'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
            'Accept': 'application/vnd.api+json',
            "Content-Disposition": `file;filename="${img.name}"`,
        }
    };
    let url =userUrl.saveUserImageUrl;
    return axios.post(url, img, config);
}

export default { getRoles , deleteUser ,getUsers,multiAction,getUser,editUser,registerUser,saveUserImage};