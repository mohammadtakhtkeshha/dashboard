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
    let url = contentUrl.uploadSingImgUrl;
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

export function getContents() {
    let url = contentUrl.getContentsUrl
    // return axios.get(url, authHeader);
    return Method({method:'get',url:url,headers: authHeader});
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
    let data = {
        "type": {
            "target_id": "article"
        },
        "title": "test",
        "body": "dxfcgvhjkلرالالربیبیباذlmس",
        "field_domain_access": {
            "target_id": "1_dash_webrbp_ir,dash_webrbp_ir,3_dash_webrbp_ir",
            "target_type": "domain"
        },
        "field_domain_all_affiliates": true,
        "field_domain_source": {
            "target_id": "dash_webrbp_ir",
            "target_type": "domain",
            "target_uuid": "67f5f76f-7730-4aa5-8504-8d00e44bc720"
        },
        "field_field_galeries": {
            "target_id": "1141,1142,1143",
            "display": true,
            "target_type": "file"
        },
        "field_files": {
            "target_id": "161",
            "display": true,
            "target_type": "file"
        },
        "field_image": {
            "target_id": "158",
            "target_type": "file"
        },
        "field_rotitr": "روتیتر",
        "field_sotitr": "سوتیتر",
        "field_sounds": {
            // "target_id": "346",
            // "target_type": "file"
        },

        "field_tags": {
            // "target_id": "25,50,68"
        },
        "field_seo_list": {
            "title": "عنوان پیج برای سئو",
            "description": "خلاصه برای سئو",
            "abstract": "چکیده برای سئو",
            "keywords": "کلمه کلیدی اول , کلمه کلیدی دوم , کلمه کلیدی سوم"
        },
        "field_videos": {
            "target_id": "1140",
            "target_type": "file"
        },

        "status": false,
        "publish_on": "2022-11-29T21:33:09+00:00",
        "unpublish_on": "2023-11-29T21:33:09+00:00"
    }
    return axios.post(url, content, aacaAuthauHeader);
}

export function getContentTypeList(handleError) {
    let url = contentUrl.getContentTypeListUrl;
    return Method({method:'get',url:url,handleError:handleError});
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
