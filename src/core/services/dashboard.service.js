import axios from "axios";
import storage from './../../../src/libraries/local-storage'
import {authHeader} from "../../utils/headers";

export function getContentLis() {
    let url = `http://dash.webrbp.ir/api/all_content/dashboard/chart`;
    return axios.get(url, authHeader);
}

export function getTenNumberOfContents(token) {
    let url = `http://dash.webrbp.ir/api/all_content/dashboard`;
    return axios.get(url, authHeader);
}

export function getTenNumberOfUsers(token) {
    let url = `http://dash.webrbp.ir/api/user/v2/dashboard`;
    let config = {
        headers: {
            'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
        }
    };
    return axios.get(url, config);
}

export function getUsers() {
    let url = `http://dash.webrbp.ir/api/user/v2/dashboard/chart`;
    return axios.get(url);
}

export function getTenNumberOfComments() {
    let url = `http://dash.webrbp.ir/last_comment/dashboard?_format=json`;
    return axios.get(url);
}

export function getCommentChart() {
    let url = `http://dash.webrbp.ir/last_comment/chart`;
    return axios.get(url);
}

export default {
    getContentLis,
    getTenNumberOfContents,
    getTenNumberOfUsers,
    getUsers,
    getTenNumberOfComments,
    getCommentChart
}