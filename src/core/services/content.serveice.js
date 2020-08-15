import axios from "axios";
import storage from "../../libraries/local-storage";
import contentUrl from './../../utils/urls/content.urls';

export function getDomainSource() {
    let url = contentUrl.domainSourceUrl;
    return axios.get(url);
}

export function getCategories() {
    let url = contentUrl.getCategoriesUrl;
    let config = {
        headers: {
            'Content-Type': 'application/hal+json',
            'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
            'Accept': 'application/hal+json'
        }
    }
    return axios.get(url, config);
}

export function uploadSingImg(e) {
    let file = e[0];
    let url = contentUrl.uploadSingImgUrl;
    let config = {
        headers: {
            'Content-Type': 'application/octet-stream',
            'Accept': 'application/vnd.api+json',
            'authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
            'Content-Disposition': `file; filename="${file.name}"`
        }
    }
    return axios.post(url, file, config);
}

export function uploadVideo(e) {
    let file = e[0];
    let url = contentUrl.uploadVideoUrl;
    let config = {
        headers: {
            'Content-Type': 'application/octet-stream',
            'Accept': 'application/vnd.api+json',
            'authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
            'Content-Disposition': `file; filename="${file.name}"`
        }
    }
    return axios.post(url, file, config);
}

export function uploadVoice(e) {
    let file = e[0];
    let url = contentUrl.uploadVoiceUrl;
    let config = {
        headers: {
            'Content-Type': 'application/octet-stream',
            'Accept': 'application/vnd.api+json',
            'authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
            'Content-Disposition': `file; filename="${file.name}"`
        }
    }
    return axios.post(url, file, config);
}



export default {getDomainSource, getCategories, uploadSingImg, uploadVideo, uploadVoice};