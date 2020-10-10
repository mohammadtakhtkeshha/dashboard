import axios from "axios";
import contentUrl from 'utils/urls/content.urls';
import {aacaAuthauHeader, ahchauthHeader, authHeader, avcoAuthcdHeader, caauthHeader} from "utils/headers";
import {Method} from "structure/layout";

export function getDomainSource() {
    let url = contentUrl.domainSourceUrl;
    return axios.get(url);
}

export function getCategories() {
    let url = contentUrl.getCategoriesUrl;
    return axios.get(url, ahchauthHeader);
}

export function uploadSingImg(e) {
    const url = contentUrl.uploadSingImgUrl;
    return axios.post(url, e[0], avcoAuthcdHeader(e[0]));
}

export function uploadMultiImg(e) {
    let url = contentUrl.uploadMultiImgUrl;
    return axios.post(url, e, avcoAuthcdHeader(e));
}

export function uploadVideo(e) {
    let url = contentUrl.uploadVideoUrl;
    return axios.post(url, e, avcoAuthcdHeader(e));
}

export function uploadVoice(e) {
    let url = contentUrl.uploadVoiceUrl;
    return axios.post(url, e, avcoAuthcdHeader(e));
}

export function uploadMultiFile(e) {
    let url = contentUrl.uploadFileUrl;
    return axios.post(url, e, avcoAuthcdHeader(e));
}

export function getContents(handleError) {
    let url = contentUrl.getContentsUrl
    // return axios.get(url, authHeader);
    return Method({method:'get',url:url,headers: authHeader,handleError:handleError});
}

export function deleteContent(id) {
    let url = contentUrl.deleteContentUrl(id);
    return Method({method:'delete',url:url,headers:ahchauthHeader});
}

export function getContent(id) {
    let url = contentUrl.getContentUrl(id);
    return axios.get(url);
}

export function registerContent(content) {
    let url = contentUrl.registerContentUrl;
    return axios.post(url, content, aacaAuthauHeader);
}

export function getContentTypeList(handleError) {
    let url = contentUrl.getContentTypeListUrl;
    return Method({method:'get',headers:authHeader,url:url,handleError:handleError});
}

export function handleContentAction(action, selectedCheckBoxes,handleError) {
    let urlDelete = contentUrl.contentActionDeleteUrl;
    let urlStatus = contentUrl.contentActionStatusUrl;
    const body = [];
    switch (action) {
        case 'deleted':
            for (let item of selectedCheckBoxes) {
                body.push({
                    "id": item,
                    "setdelete": "deleted"
                })
            }
            return Method({method:'post',url:urlDelete,headers:caauthHeader,body:body,handleError:handleError});
            break;
        case 'true':
            for (let item of selectedCheckBoxes) {
                body.push({
                    "id": item,
                    "setPublished": true
                })
            }
            return Method({method:'post',url:urlStatus,headers:caauthHeader ,body:body,handleError:handleError});
            break;
        default:
            for (let item of selectedCheckBoxes) {
                body.push({
                    "id": item,
                    "setPublished": false
                })
            }
            return Method({method:'post',url:urlStatus,headers: caauthHeader,body: body,handleError:handleError});
    }
}

export default {
    getDomainSource,
    getCategories,
    uploadSingImg,
    uploadVideo,
    uploadVoice,
    uploadMultiImg,
    uploadMultiFile,
    registerContent,
    getContents,
    deleteContent,
    getContentTypeList,
    getContent,
    handleContentAction
};
