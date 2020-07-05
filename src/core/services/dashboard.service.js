import axios from "axios";
import {apiUrl} from '../../adf';

export function getContentLis() {
    let url = `${apiUrl}/api/all_content?_format=json`;
    return axios.get(url);
}

export function getTenNumberOfContents(token) {
    let url = `${apiUrl}/api/all_content/dashboard?_format=json`;
    let config = {
        headers: {
            Authorization: token,
        }
    };
    return axios.get(url, config);
}

export function getTenNumberOfUsers(token) {
    let url = `${apiUrl}/api/user/v2/dashboard`;
    let config = {
        headers: {
            'Authorization': token,
        }
    };
    return axios.get(url, config);
}

export function getUsers() {
    let url = `${apiUrl}/api/user/v2/dashboard/chart`;
    return axios.get(url);
}

export function getTenNumberOfComments() {
    let url = `${apiUrl}/last_comment/dashboard?_format=json`;
    return axios.get(url);
}

export function getContents() {
    let url = `${apiUrl}/last_comment/chart?_format=json`;
    return axios.get(url);
}

export default {
    getContentLis,
    getTenNumberOfContents,
    getTenNumberOfUsers,
    getUsers,
    getTenNumberOfComments,
    getContents
}