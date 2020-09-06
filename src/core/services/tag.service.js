import axios from "axios";
import storage from "../../libraries/local-storage";
import tagUrl from './../../utils/urls/tag.urls';

export function getTags(page) {
    let url = tagUrl.getTagsUrl(page);
    let config = {
        headers: {
            'Content-Type': 'application/hal+json',
            'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
            'Accept': 'application/hal+json'
        }
    }
    return axios.get(url, config);
}

export function addTag(body) {
    let url = tagUrl.addTagUrl;
    const config = {
        headers: {
            'Content-Type': 'application/hal+json',
            'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
            'Accept': 'application/hal+json',
        }
    };
    return axios.post(url, body, config);
}

export function deleteTag(id) {
    let url = tagUrl.deleteTagUrl(id);
    const config = {
        headers: {
            'Content-Type': 'application/hal+json',
            'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
            'Accept': 'application/hal+json',
        }
    };
    return axios.delete(url, config);
}

export function getTag(id) {
    let url = tagUrl.getTagUrl(id);
    const config = {
        headers: {
            'Content-Type': 'application/hal+json',
            'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
        }
    };
    return axios.get(url,config);
}

export function editTag(id,body){
    let url=tagUrl.getTagUrl(id);
    const config = {
        headers: {
            'Content-Type': 'application/hal+json',
            'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
            'Accept': 'application/hal+json',
        }
    };
    return axios.patch(url,body,config);
}

export default {getTags, addTag, deleteTag,getTag,editTag};
